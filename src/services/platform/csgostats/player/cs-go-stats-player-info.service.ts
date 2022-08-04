import { PlatformNames } from "../../../../enums";
import { IPlayer } from "../../../../interfaces";

import { CSGOStatsBase } from "../base";

export class CSGOStatsPlayerInfo extends CSGOStatsBase {
  // TODO merge this method with others that do the same function
  playerId = (url: string): string => {
    return url.split("/").slice(-1)[0];
  };

  playerDetails = async (url: string): Promise<IPlayer> => {
    const details = this.$(".player-ident-outer");

    const name = details.find("#player-name").text().trim();
    const imageUrl = details.find("img").attr("src")!;
    const platformPlayerId = this.playerId(url);

    return {
      name,
      imageUrl,
      platform: PlatformNames.CSGOSTATS,
      platformPlayerId,
    };
  };
}
