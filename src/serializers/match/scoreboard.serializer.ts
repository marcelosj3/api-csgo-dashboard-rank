import { Scoreboard } from "../../entities";
import { IScoreboardSerializer } from "../../interfaces";

export const scoreboardSerializer = (
  scoreboard: Scoreboard
): IScoreboardSerializer => {
  return {
    team1Rounds: scoreboard.team1Rounds,
    team2Rounds: scoreboard.team2Rounds,
  };
};
