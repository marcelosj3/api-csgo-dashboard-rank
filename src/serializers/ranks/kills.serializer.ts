import { PlayerMatch } from "../../entities";
import { IRanksKills } from "../../interfaces";

export const ranksKillsSerializer = (
  playerMatch: PlayerMatch
): IRanksKills => ({
  name: playerMatch.player.name,
  kills: playerMatch.kills,
  matchUrl: playerMatch.matches[0].matchUrl,
});
