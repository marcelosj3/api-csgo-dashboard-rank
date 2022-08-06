import { Match, PlayerMatch } from "../../entities";
import { IMatchSerializer } from "../../interfaces";

import { playerMatchSerializer } from "./players-match.serializer";
import { scoreboardSerializer } from "./scoreboard.serializer";

export const matchSerializer = (match: Match): IMatchSerializer => {
  return {
    platformMatchId: match.platformMatchId,
    platform: match.platform.name,
    matchUrl: match.matchUrl,
    mapName: match.mapName,
    date: match.date,
    scoreboard: scoreboardSerializer(match.scoreboard),
    players: match.playerMatches.map((player: PlayerMatch) =>
      playerMatchSerializer(player)
    ),
  };
};
