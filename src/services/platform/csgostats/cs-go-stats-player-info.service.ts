import { Cheerio, Element } from "cheerio";

import { IPlayerInfo } from "../../../interfaces";

import { CSGOStatsBase } from "./cs-go-stats-base.service";

export class CSGOStatsPlayerInfo extends CSGOStatsBase {
  playerStats = async (
    playerElement: Cheerio<Element>
  ): Promise<IPlayerInfo> => {
    const playerStatsArray = playerElement
      .find("td")
      .toArray()
      .map((statsElement, index) => {
        const stats = this.$(statsElement);

        switch (index) {
          case this.PLAYER_INFO_INDEX:
            return this.playerInfo(stats);
          case this.KILLS_INFO_INDEX:
            return this.killsInfo(stats);
          case this.DEATHS_INFO_INDEX:
            return this.deathsInfo(stats);
          case this.ASSISTS_INFO_INDEX:
            return this.assistsInfo(stats);
          case this.KILL_DEATH_DIFFERENCE_INDEX:
            return this.killDeathDifferenceInfo(stats);
          case this.KILL_DEATH_RATIO_INDEX:
            return this.killDeathRatioInfo(stats);
        }
      });

    const playerStats = playerStatsArray
      .filter((element) => element)
      .reduce((acc, value) => Object.assign(acc!, value), {});

    return playerStats as IPlayerInfo;
  };

  PLAYER_INFO_INDEX = 0;
  playerInfo = (stats: Cheerio<Element>): Partial<IPlayerInfo> => {
    const imageUrl = stats.find("img").attr("src");
    const name = stats.find("a > span").text();
    const csgostatsId = stats.find("a").attr("href")?.split("/").slice(-1)[0];

    return { imageUrl, name, csgostatsId };
  };

  KILLS_INFO_INDEX = 2;
  killsInfo = (stats: Cheerio<Element>): Partial<IPlayerInfo> => {
    const kills = Number(stats.text());

    return { kills };
  };

  DEATHS_INFO_INDEX = 3;
  deathsInfo = (stats: Cheerio<Element>): Partial<IPlayerInfo> => {
    const deaths = Number(stats.text());

    return { deaths };
  };

  ASSISTS_INFO_INDEX = 4;
  assistsInfo = (stats: Cheerio<Element>): Partial<IPlayerInfo> => {
    const assists = Number(stats.text());

    return { assists };
  };

  KILL_DEATH_DIFFERENCE_INDEX = 5;
  killDeathDifferenceInfo = (stats: Cheerio<Element>): Partial<IPlayerInfo> => {
    const killDeathDifference = Number(stats.text());

    return { killDeathDifference };
  };

  KILL_DEATH_RATIO_INDEX = 6;
  killDeathRatioInfo = (stats: Cheerio<Element>): Partial<IPlayerInfo> => {
    const killDeathRatio = Number(stats.text());

    return { killDeathRatio };
  };
}
