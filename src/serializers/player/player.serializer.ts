import { Player } from "../../entities";
import { IPlayerSerializer } from "../../interfaces";

import { platformCredentialsSerializer } from "../platform-credentials";

export const playerSerializer = (
  player: Player,
  platformCredentials: boolean = true
): IPlayerSerializer => {
  return {
    playerId: player.playerId,
    player: player.name,
    imageUrl: player.imageUrl,

    platformCredentials: platformCredentials
      ? player.platformCredentials.map((platformCredentials) =>
          platformCredentialsSerializer(platformCredentials)
        )
      : undefined,
  };
};
