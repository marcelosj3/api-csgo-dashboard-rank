import { Request } from "express";
import { EntityManager } from "typeorm";

import { AppDataSource } from "../data-source";
import { Platform, PlatformCredentials, Player } from "../entities";
import { PlatformNames } from "../enums";
import { Puppeteer } from "../utils";

import { CSGOStats } from "./platform";

class PlayerService {
  private puppeteer = Puppeteer;
  private platformService = CSGOStats;

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
    const { url } = body;

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

    return { status: 200, message: player };
  };
}

export default new PlayerService();
