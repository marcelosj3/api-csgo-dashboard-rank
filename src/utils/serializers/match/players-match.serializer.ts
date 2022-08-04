import { PlayerMatch } from "../../../entities";
import { IPlayerMatchSerializer } from "../../../interfaces";

export const playerMatchSerializer = (
  playerMatch: PlayerMatch
): IPlayerMatchSerializer => {
  return {
    player: playerMatch.player.name,
    team: playerMatch.team,
    kills: playerMatch.kills,
    deaths: playerMatch.deaths,
    assists: playerMatch.assists,
    killDeathDifference: playerMatch.killDeathDifference,
    killDeathRatio: playerMatch.killDeathRatio,
    averageDamagePerRound: playerMatch.averageDamagePerRound,
    headshotPercentage: playerMatch.headshotPercentage,
    kast: playerMatch.kast,
    enemiesFlashed: playerMatch.enemiesFlashed,
    flashAssists: playerMatch.flashAssists,
    enemiesBlindTime: playerMatch.enemiesBlindTime,
    utilityDamage: playerMatch.utilityDamage,
    clutch1vx: playerMatch.clutch1vx,
    tradeKills: playerMatch.tradeKills,
    multikills: {
      _1k: playerMatch.multikill._1k,
      _2k: playerMatch.multikill._2k,
      _3k: playerMatch.multikill._3k,
      _4k: playerMatch.multikill._4k,
      _5k: playerMatch.multikill._5k,
    },
  };
};
