import { Request } from "express";
import { PlayerMatch } from "../entities";
import { ParsedQs } from "qs";

import { IRanksKills } from "../interfaces";
import { PlayerMatchRepository } from "../repositories";

type IMapCallback<T> = (playerMatch: PlayerMatch) => T;
type TOrderBy<T> = { [P in keyof T]: "ASC" | "DESC" | undefined };

class RankService {
  queryParams = ["match_url"];

  getRankInfo = async <T>(
    mapCallback: IMapCallback<T>,
    orderBy: TOrderBy<T>
    // query: ParsedQs
  ) => {
    const playerMatches: PlayerMatch[] = await PlayerMatchRepository.findAll();

    const rankInfo = playerMatches.map(mapCallback);

    rankInfo.sort((playerA, playerB) => {
      const orders = Object.entries(orderBy);

      for (const order of orders) {
        const [key, value] = order;

        const sort = value === "ASC" ? 1 : value === "DESC" ? -1 : 0;
        const invertedSort = value === "DESC" ? 1 : value === "ASC" ? -1 : 0;

        const pA = playerA[key as keyof T];
        const pB = playerB[key as keyof T];

        if (value) {
          if (pA > pB) return sort;
          if (pA < pB) return invertedSort;
        }
      }

      return 0;
    });

    return rankInfo;
  };

  getKills = async ({ query }: Request) => {
    const includeMatchUrl = query.hasOwnProperty("match_url");

    const order: TOrderBy<IRanksKills> = { kills: "DESC", name: "DESC" };
    const playersInfo: IMapCallback<IRanksKills> = (playerMatch) => ({
      name: playerMatch.player.name,
      kills: playerMatch.kills,
    });

    const playerByKills = await this.getRankInfo<IRanksKills>(
      playersInfo,
      order
      // query
    );

    return { status: 200, message: playerByKills };
  };
}

export default new RankService();
