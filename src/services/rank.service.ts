import { Request } from "express";

import { IRankInfoCallback, IRanksKills } from "../interfaces";
import { rankInfo } from "../utils";
import { QueryParam } from "../enums";

class RankService {
  queryParams: QueryParam[] = [...Object.values(QueryParam)];

  getKills = async ({ query }: Request) => {
    const playersInfo: IRankInfoCallback<IRanksKills> = (
      playerMatch
    ): IRanksKills => ({
      name: playerMatch.player.name,
      kills: playerMatch.kills,
      matchUrl: playerMatch.match.matchUrl,
    });

    const playerByKills = await rankInfo<IRanksKills>(
      playersInfo,
      query,
      this.queryParams
    );

    return { status: 200, message: playerByKills };
  };
}

export default new RankService();
