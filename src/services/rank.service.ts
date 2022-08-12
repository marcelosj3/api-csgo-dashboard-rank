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
    order: TOrderBy<T>
    // query: ParsedQs
  ) => {
    const playerMatches: PlayerMatch[] = await PlayerMatchRepository.findAll();

    const rankInfo = playerMatches.map(mapCallback);

    return rankInfo;
  };

  getKills = async ({ query }: Request) => {
    const includeMatchUrl = query.hasOwnProperty("match_url");

    const order: TOrderBy<IRanksKills> = { kills: "DESC", name: undefined };

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
