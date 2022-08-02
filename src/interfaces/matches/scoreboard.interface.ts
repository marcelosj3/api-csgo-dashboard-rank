import { Teams } from "../../enums";

export interface IScoreboard {
  team1Rounds: number;
  team2Rounds: number;
  winner: Teams;
}
