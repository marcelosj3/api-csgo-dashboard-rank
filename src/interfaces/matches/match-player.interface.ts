import { IMatchDetails } from ".";
import { IPlayerAndMatchStatsInfo } from "../match-players/player-and-match-stats-info.interface";

export interface IMatchPlayerInfo {
  match: IMatchDetails;
  players: IPlayerAndMatchStatsInfo[];
}
