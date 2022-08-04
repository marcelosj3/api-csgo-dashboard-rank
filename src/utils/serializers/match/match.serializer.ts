import { Match } from "../../../entities";

import { playerMatchSerializer } from "./players-match.serializer";

export const matchSerializer = (match: Match) => {
  return {
    platform: match.platform.name,
    platformMatchId: match.platformMatchId,
    matchUrl: match.matchUrl,
    mapName: match.mapName,
    date: match.date,
    scoreboard: {
      team1Rounds: match.scoreboard.team1Rounds,
      team2Rounds: match.scoreboard.team2Rounds,
    },
    players: match.playerMatches.map((player) => playerMatchSerializer(player)),
  };
};
