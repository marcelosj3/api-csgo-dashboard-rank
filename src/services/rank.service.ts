import { Request } from "express";

import { IRanksDeaths, IRanksKills } from "../interfaces";
import { rankInfo } from "../utils";

class RankService {
  getKills = async ({ query }: Request) => {
    const playerByKills = await rankInfo<IRanksKills>(
      (playerMatch) => ({
        name: playerMatch.player.name,
        kills: playerMatch.kills,
        matchUrl: playerMatch.match.matchUrl,
      }),
      query
    );
    return { status: 200, message: playerByKills };
  };
  getDeaths = async ({ query }: Request) => {
    const playerByDeaths = await rankInfo<IRanksDeaths>(
      (playerMatch) => ({
        name: playerMatch.player.name,
        deaths: playerMatch.deaths,
        matchUrl: playerMatch.match.matchUrl,
      }),
      query
    );
    return { status: 200, message: playerByDeaths };
  };
}

export default new RankService();
