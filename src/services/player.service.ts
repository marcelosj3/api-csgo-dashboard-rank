import { Request } from "express";
import { EntityManager } from "typeorm";

import { AppDataSource } from "../data-source";
import { Platform, PlatformCredentials, Player } from "../entities";
import { PlatformNames } from "../enums";
import { InvalidUrlError } from "../errors";
import { playerSerializer, Puppeteer } from "../utils";

import { CSGOStats } from "./platform";

class PlayerService {
  private puppeteer = Puppeteer;
  private platformService = CSGOStats;
  private baseUrl = "csgostats.gg/player/";

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

  validateUrl = (url: string) => {
    if (!url.includes(this.baseUrl)) throw new InvalidUrlError();
  };

  insertPlayer = async ({ body }: Request) => {
    const { url } = body;

    this.validateUrl(url);

    const page = await this.puppeteer.launchPage(url);

    const playerInfo = await this.platformService.playerInfo(page, url);

    const player = await AppDataSource.transaction(async (entityManager) => {
      const platform = await this.getOrCreatePlatform(
        playerInfo.platform,
        entityManager
      );

      const platformCredentials = await entityManager.save(
        PlatformCredentials,
        {
          platformNames: [platform],
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
