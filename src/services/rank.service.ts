import { Request } from "express";

import { IRanksKills } from "../interfaces";
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
}

export default new RankService();
