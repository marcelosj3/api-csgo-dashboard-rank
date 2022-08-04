import { IPlayerMatchInfo } from "./player-match-info.interface";
import { IPlayerMatchStats } from "./player-match-stats.interface";

export interface IPlayerAndMatchStatsInfo {
  playerInfo: IPlayerMatchInfo;
  matchStats: IPlayerMatchStats;
}
