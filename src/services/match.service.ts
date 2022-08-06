import { Request } from "express";
import { EntityManager } from "typeorm";

import { AppDataSource } from "../data-source";
import {
  Match,
  Multikill,
  Platform,
  PlayerMatch,
  Scoreboard,
} from "../entities";
import { PlatformNames } from "../enums";
import { UniqueKeyError } from "../errors";
import { IScoreboard } from "../interfaces";
import { MatchRepository, PlayerRepository } from "../repositories";
import {
  matchSerializer,
  pageOr404,
  Puppeteer,
  validateAndReturnUrlAndId,
} from "../utils";

import { CSGOStats } from "./platform";

class MatchService {
  private puppeteer = Puppeteer;
  private platformService = CSGOStats;
  private baseUrl: string = CSGOStats.baseUrl;
  private matchUrl: string = CSGOStats.matchUrlEndpoint;

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
    let scoreboard = await entityManager.findOneBy(Scoreboard, scoreboardInfo);

    if (!scoreboard) {
      scoreboard = await entityManager.save(Scoreboard, scoreboardInfo);
    }

    return scoreboard;
  };

  handleMatch = async ({ body }: Request) => {
    const { url: urlReceived } = body;

    const [matchId, url] = validateAndReturnUrlAndId(
      urlReceived,
      this.baseUrl,
      this.matchUrl
    );

    const matchExists = await MatchRepository.findOne(matchId);

    if (matchExists)
      throw new UniqueKeyError(undefined, undefined, {
        match: "A match with that id was already registered.",
      });

    const page = await pageOr404(url, this.puppeteer, "match");

    const matchInfo = await this.platformService.createMatchInfo(page, url);

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
        playerMatches: [],
      };

      const playerMatchesArray = Promise.all(
        matchInfo.players.map(async (playerDetails) => {
          const player = await PlayerRepository.findOne(
            playerDetails.playerInfo.platformPlayerId,
            this.platformService.platform
          );

          if (!player) return undefined;

          const multikill = await entityManager.save(
            Multikill,
            playerDetails.matchStats.multikill
          );

          const playerMatches = entityManager.create(PlayerMatch, {
            ...playerDetails.matchStats,
            multikill: undefined,
            player,
          });

          playerMatches.multikill = multikill;

          return await entityManager.save(PlayerMatch, playerMatches);
        })
      );

      const playerMatches = (await playerMatchesArray).filter(
        (player) => player
      ) as PlayerMatch[];

      const match = entityManager.create(Match, matchStatsInfo);

      match.platform = platform;
      match.scoreboard = scoreboard;
      match.playerMatches = playerMatches;

      return await entityManager.save(Match, match);
    });

    await this.puppeteer.close();

    const serializedMatch = matchSerializer(match);

    return { status: 200, message: serializedMatch };
  };
}

export default new MatchService();
