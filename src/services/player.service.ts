import { Request } from "express";
import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Match, Platform, Scoreboard } from "../entities";
import { PlatformCredentials } from "../entities/platform-credentials";
import { Player } from "../entities/player.entity";
import { PlatformNames } from "../enums";
import { IScoreboard } from "../interfaces/matches";

import { Playwright } from "../utils/playwright";
import { CSGOStats } from "./platform";

class PlayerService {
  private playwright = Playwright;
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

    const page = await this.playwright.launchPage(url);

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

    await this.playwright.close();

    return { status: 200, message: player };
  };
}

export default new PlayerService();
