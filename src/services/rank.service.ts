import { Request } from "express";

import { IKillsRank } from "../interfaces";
import { PlayerMatchRepository } from "../repositories";

class RankService {
  getKills = async ({ query }: Request) => {
    const includeMatchUrl = query.hasOwnProperty("match_url");

    let playerMatches;

    if (includeMatchUrl) {
      playerMatches = await PlayerMatchRepository.findAllWithMatchUrl();
    } else {
      playerMatches = await PlayerMatchRepository.findAll();
    }

    const playerByKills = playerMatches
      .map((playerMatch): IKillsRank => {
        return {
          name: playerMatch.player.name,
          kills: playerMatch.kills,
          matchUrl: includeMatchUrl
            ? playerMatch.matches[0].matchUrl
            : undefined,
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
