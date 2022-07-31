import { IMatchInfo } from "../matches";
import { IPlayerInfo } from "../players";

export interface IMatchPlayerInfo {
  match: IMatchInfo;
  team_1: IPlayerInfo[];
  team_2: IPlayerInfo[];
}
