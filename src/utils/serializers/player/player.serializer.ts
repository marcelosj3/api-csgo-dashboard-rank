import { Player } from "../../../entities";

import { platformCredentialsSerializer } from "../platform-credentials";

export const playerSerializer = (player: Player) => {
  return {
    playerId: player.playerId,
    player: player.name,
    imageUrl: player.imageUrl,
    platformCredentials: player.platformCredentials.map((platformCredentials) =>
      platformCredentialsSerializer(platformCredentials)
    ),
  };
};
