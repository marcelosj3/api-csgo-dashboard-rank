import { IMatchDetails } from ".";
import { IPlayerAndMatchStatsInfo } from "../match-player/player-and-match-stats-info.interface";

export interface IMatchPlayerInfo {
  match: IMatchDetails;
  players: IPlayerAndMatchStatsInfo[];
}
