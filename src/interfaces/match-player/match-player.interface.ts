import { IMatchDetails } from "../matches";
import { IPlayerInfo } from "../players";

export interface IMatchPlayerInfo {
  match: IMatchDetails;
  team_1: IPlayerInfo[];
  team_2: IPlayerInfo[];
}
