import { PlayerMatch } from "../../entities";
import { IRanksDeaths } from "../../interfaces";

export const ranksDeathsSerializer = (
  playerMatch: PlayerMatch
): IRanksDeaths => ({
  name: playerMatch.player.name,
  deaths: playerMatch.deaths,
  matchUrl: playerMatch.match.matchUrl,
});
