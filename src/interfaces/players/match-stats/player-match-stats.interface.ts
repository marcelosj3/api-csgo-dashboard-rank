import { Teams } from "../../../enums";

import { IMultikill } from "./multikill.interface";

export interface IPlayerMatchStats {
  team: Teams;
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
  enemiesBlindTime?: number;
  utilityDamage?: number;
  clutch1vx: number;
  tradeKills: number;
  multikill: IMultikill;
}
