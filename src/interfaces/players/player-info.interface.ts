import { IPlayerMatchStats } from "./match-stats";
import { IPlayerMatchInfo } from "./player-match-info.interface";

export interface IPlayerInfo {
  playerInfo: IPlayerMatchInfo;
  matchStats: IPlayerMatchStats;
}
