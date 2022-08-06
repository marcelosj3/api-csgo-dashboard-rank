import { Request } from "express";
import { EntityManager } from "typeorm";

import { AppDataSource } from "../data-source";
import { Platform, PlatformCredentials, Player } from "../entities";
import { PlatformNames } from "../enums";
import { NotFoundError, UniqueKeyError } from "../errors";
import { PlayerRepository } from "../repositories";
import { TPage, TPuppeteer } from "../types";
import {
  pageOr404,
  playerSerializer,
  Puppeteer,
  validateAndReturnUrlAndId,
} from "../utils";

import { CSGOStats } from "./platform";

class PlayerService {
  private puppeteer: TPuppeteer = Puppeteer;
  // TODO when defining a new platform, create a logic
  // to redefine these variables
  private platformService = CSGOStats;
  private baseUrl: string = CSGOStats.baseUrl;
  private playerUrl: string = CSGOStats.playerUrlEndpoint;

  getOrCreatePlatform = async (
    name: PlatformNames,
    entityManager: EntityManager
  ) => {
    let platform = await entityManager.findOneBy(Platform, { name });

    if (!platform) {
      platform = await entityManager.save(Platform, { name });
    }

    return platform;
  };

  insertPlayer = async ({ body }: Request) => {
    const { url: receivedUrl } = body;

    const [platformPlayerId, url] = validateAndReturnUrlAndId(
      receivedUrl,
      this.baseUrl,
      this.playerUrl
    );

    const hasPlatformPlayer = await PlayerRepository.findOne(
      platformPlayerId,
      this.platformService.platform
    );

    if (hasPlatformPlayer)
      throw new UniqueKeyError(undefined, undefined, {
        error: "A player with that platform id has already been registered.",
      });

    const page = await pageOr404(url, this.puppeteer, "player");

    const playerInfo = await this.platformService.playerInfo(
      page,
      platformPlayerId,
      this.puppeteer
    );

    const player = await AppDataSource.transaction(async (entityManager) => {
      const platform = await this.getOrCreatePlatform(
        playerInfo.platform,
        entityManager
      );

      const platformCredentials = await entityManager.save(
        PlatformCredentials,
        {
          platform: platform,
          platformPlayerId: playerInfo.platformPlayerId,
        }
      );

      const playerDetails = {
        ...playerInfo,
        platform: undefined,
        platformPlayerId: undefined,
      };

      const player = entityManager.create(Player, playerDetails);

      player.platformCredentials = [platformCredentials];

      return await entityManager.save(Player, player);
    });

    const playerSerialized = playerSerializer(player);

    return { status: 200, message: playerSerialized };
  };
}

export default new PlayerService();
