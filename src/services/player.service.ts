import { Request } from "express";
import { EntityManager } from "typeorm";

import { AppDataSource } from "../data-source";
import { Platform, PlatformCredentials, Player } from "../entities";
import { PlatformNames } from "../enums";
import { UniqueKeyError } from "../errors";
import { PlayerRepository } from "../repositories";
import {
  playerSerializer,
  Puppeteer,
  validateAndReturnUrlAndId,
} from "../utils";

import { CSGOStats } from "./platform";

class PlayerService {
  private puppeteer = Puppeteer;
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

    const hasPlayer = await PlayerRepository.findOne(platformPlayerId);

    if (hasPlayer)
      throw new UniqueKeyError(undefined, undefined, {
        player: "A player with that platform id has already been registered.",
      });

    const page = await this.puppeteer.launchPage(url);

    const playerInfo = await this.platformService.playerInfo(
      page,
      platformPlayerId
    );

    const player = await AppDataSource.transaction(async (entityManager) => {
      const platform = await this.getOrCreatePlatform(
        playerInfo.platform,
        entityManager
      );

      const platformCredentials = await entityManager.save(
        PlatformCredentials,
        {
          platformNames: platform,
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

    await this.puppeteer.close();

    const playerSerialized = playerSerializer(player);

    return { status: 200, message: playerSerialized };
  };
}

export default new PlayerService();
