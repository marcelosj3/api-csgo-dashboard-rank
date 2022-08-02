import { Cheerio, Element } from "cheerio";
import { Page } from "playwright";
import { PlatformNames } from "../../../enums";
import { IPlayer } from "../../../interfaces";

import { CSGOStatsBase } from "./cs-go-stats-base.service";

export class CSGOStatsPlayerInfo extends CSGOStatsBase {
  playerId = (url: string): string => {
    return url.split("/").slice(-1)[0];
  };

  playerDetails = async (url: string): Promise<IPlayer> => {
    const details = this.$(".player-ident-outer");

    const name = details.find("#player-name").text();
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
