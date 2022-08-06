import { PlatformNames } from "../../../../enums";
import { IPlayer } from "../../../../interfaces";

import { CSGOStatsBase } from "../base";

export class CSGOStatsPlayerInfo extends CSGOStatsBase {
  playerDetails = async (playerId: string): Promise<IPlayer> => {
    const details = this.$(".player-ident-outer");

    const name = details.find("#player-name").text().trim();
    const imageUrl = details.find("img").attr("src")!;
    const platformPlayerId = playerId;
    const steamPlayerId = details
      .find("div > a")
      .attr("href")
      ?.replace(this.steamProfileEndpoint, "")!;

    return {
      playerId: steamPlayerId,
      name,
      imageUrl,
      platform: PlatformNames.CSGOSTATS,
      platformPlayerId,
    };
  };
}
