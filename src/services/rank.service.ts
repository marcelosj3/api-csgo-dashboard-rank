import { Request } from "express";

import { IKillsRank } from "../interfaces";
import { PlayerMatchRepository } from "../repositories";

class RankService {
  getKills = async ({ query }: Request) => {
    const includeMatchUrl = query.hasOwnProperty("match_url");

    const playerMatches = await PlayerMatchRepository.findAll();

    const playerByKills = playerMatches
      .map((playerMatch): IKillsRank => {
        return {
          name: playerMatch.player.name,
          kills: playerMatch.kills,
          matchUrl: includeMatchUrl ? playerMatch.match.matchUrl : undefined,
        };
      })
      .sort((playerA, playerB) => {
        if (playerA.kills > playerB.kills) return -1;
        if (playerA.kills < playerB.kills) return 1;
        return 0;
      });

    return { status: 200, message: playerByKills };
  };
}

export default new RankService();
