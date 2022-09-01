import { Request } from "express";


import { IRanksADRs, IRanksAssists, IRanksDeaths, IRanksHSs, IRanksKDDs, IRanksKDRs, IRanksKills } from "../interfaces";
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

  getADRs = async ({ query }: Request) => {
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

  getKDDs = async ({ query }: Request) => {
    const playerByKDDs = await rankInfo<IRanksKDDs>(
      (playerMatch) => ({
        name: playerMatch.player.name,
        kdd: playerMatch.killDeathDifference,
        matchUrl: playerMatch.match.matchUrl,
      }),
      query
    );
    return { status: 200, message: playerByKDDs };
  };

  getKDRs = async ({ query }: Request) => {
    const playerByKDRs = await rankInfo<IRanksKDRs>(
      (playerMatch) => ({
        name: playerMatch.player.name,
        kdr: playerMatch.killDeathRatio,
        matchUrl: playerMatch.match.matchUrl,
      }),
      query
    );
    return { status: 200, message: playerByKDRs };
  };

  getHSs = async ({ query }: Request) => {
    const playerByHSs = await rankInfo<IRanksHSs>(
      (playerMatch) => ({
        name: playerMatch.player.name,
        hs: playerMatch.headshotPercentage,
        matchUrl: playerMatch.match.matchUrl,
      }),
      query
    );
    return { status: 200, message: playerByHSs };
  };

}

export default new RankService();
