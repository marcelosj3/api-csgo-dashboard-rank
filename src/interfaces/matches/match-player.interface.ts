import { IMatchDetails } from ".";
import { IPlayerAndMatchStatsInfo } from "../match-player/player-and-match-stats-info.interface";

export interface IMatchPlayerInfo {
  match: IMatchDetails;
  team_1: IPlayerAndMatchStatsInfo[];
  team_2: IPlayerAndMatchStatsInfo[];
}
