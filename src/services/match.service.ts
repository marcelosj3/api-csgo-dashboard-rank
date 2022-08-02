import { Request } from "express";
import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Match, Platform, Scoreboard } from "../entities";
import { PlatformNames } from "../enums";
import { IScoreboard } from "../interfaces/matches";

import { Playwright } from "../utils/playwright";
import { CSGOStats } from "./platform";

class MatchesService {
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

  getOrCreateScoreboard = async (
    scoreboardInfo: IScoreboard,
    entityManager: EntityManager
  ) => {
    let scoreboard = await entityManager.findOneBy(Scoreboard, {
      ...scoreboardInfo,
    });

    if (!scoreboard) {
      scoreboard = await entityManager.save(Scoreboard, { ...scoreboardInfo });
    }

    return scoreboard;
  };

  insertMatch = async ({ body }: Request) => {
    const { url } = body;

    const page = await this.playwright.launchPage(url);

    const matchInfo = await this.platformService.matchInfo(page, url);

    const match = await AppDataSource.transaction(async (entityManager) => {
      const platform = await this.getOrCreatePlatform(
        matchInfo.match.platform,
        entityManager
      );

      const scoreboard = await this.getOrCreateScoreboard(
        matchInfo.match.scoreboard,
        entityManager
      );

      const matchStatsInfo = {
        ...matchInfo.match,
        platform: undefined,
        scoreboard: undefined,
      };

      const match = entityManager.create(Match, matchStatsInfo);

      match.platform = platform;
      match.scoreboard = scoreboard;

      return await entityManager.save(Match, match);
    });

    await this.playwright.close();

    return { status: 200, message: match };
  };
}

export default new MatchesService();
