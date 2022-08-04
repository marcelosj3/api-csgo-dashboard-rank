export interface IPlayerMatchSerializer {
  player: string;
  team: string;
  kills: number;
  deaths: number;
  assists: number;
  killDeathDifference: number;
  killDeathRatio: number;
  averageDamagePerRound: number;
  headshotPercentage: number;
  kast: number;
  enemiesFlashed: number;
  flashAssists: number;
  enemiesBlindTime: number;
  utilityDamage: number;
  clutch1vx: number;
  tradeKills: number;
  multikills: {
    _1k: number;
    _2k: number;
    _3k: number;
    _4k: number;
    _5k: number;
  };
}
