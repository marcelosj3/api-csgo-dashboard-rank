import { Match, PlayerMatch } from "../../entities";
import { IMatchSerializer } from "../../interfaces";
import { playerSerializer } from "../player";

import { playerMatchSerializer } from "./players-match.serializer";
import { scoreboardSerializer } from "./scoreboard.serializer";

export const matchSerializer = (
  match: Match,
  onlyPlayerInfo: boolean = false
): IMatchSerializer => {
  return {
    platformMatchId: match.platformMatchId,
    platform: match.platform.name,
    matchUrl: match.matchUrl,
    mapName: match.mapName,
    date: match.date,

    scoreboard: match.scoreboard
      ? scoreboardSerializer(match.scoreboard)
      : undefined,

    players: match.playerMatches
      ? match.playerMatches.map((playerMatch: PlayerMatch) =>
          onlyPlayerInfo
            ? playerSerializer(playerMatch.player)
            : playerMatchSerializer(playerMatch)
        )
      : undefined,
  };
};
