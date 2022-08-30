import { Request } from "express";


import { IRanksADRs, IRanksAssists, IRanksDeaths, IRanksKills } from "../interfaces";
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
      }),
      query
    );
    return { status: 200, message: playerByDeaths };
  };

  getADR = async ({ query }: Request) => {
    const playerByADRs = await rankInfo<IRanksADRs>(
      (playerMatch) => ({
        name: playerMatch.player.name,
        adr: playerMatch.averageDamagePerRound,
        matchUrl: playerMatch.match.matchUrl,
      }),
      query
    );
    return { status: 200, message: playerByADRs };
  };
  
  getAssists = async ({ query }: Request) => {
    const playerByAssists = await rankInfo<IRanksAssists>(
      (playerMatch) => ({
        name: playerMatch.player.name,
        assists: playerMatch.assists,
        matchUrl: playerMatch.match.matchUrl,
      }),
      query
    );
    return { status: 200, message: playerByAssists };
  };

}

export default new RankService();
