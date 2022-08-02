import { Cheerio, Element } from "cheerio";

import { IPlayerInfo, IPlayerMatchStats } from "../../../interfaces";
import { IMultikill } from "../../../interfaces/players/match-stats/multikill.interface";
import { IPlayerMatchInfo } from "../../../interfaces/players/player-match-info.interface";

import { CSGOStatsBase } from "./cs-go-stats-base.service";

export class CSGOStatsMatchPlayerInfo extends CSGOStatsBase {
  PLAYER_INFO_INDEX = 0;
  KILLS_INFO_INDEX = 2;
  DEATHS_INFO_INDEX = 3;
  ASSISTS_INFO_INDEX = 4;
  KILL_DEATH_DIFFERENCE_INDEX = 5;
  KILL_DEATH_RATIO_INDEX = 6;
  AVERAGE_DAMAGE_PER_ROUND_INDEX = 7;
  HEADSHOT_PERCENTAGE_INDEX = 8;
  KAST_INDEX = 9;
  ENEMIES_FLASHED_INDEX = 11;
  FLASH_ASSISTS_INDEX = 12;
  ENEMIES_BLIND_TIME_INDEX = 13;
  UTILITY_DAMAGE_INDEX = 14;
  CLUTCH_1VX_INDEX = 30;
  TRADE_KILLS_INDEX = 22;
  MULTIKILL_5K_INDEX = 37;
  MULTIKILL_4K_INDEX = 38;
  MULTIKILL_3K_INDEX = 39;
  MULTIKILL_2K_INDEX = 40;
  MULTIKILL_1K_INDEX = 41;

  normalizeArray = <T>(array: Partial<T | undefined>[]): T => {
    return array
      .filter((element) => element)
      .reduce((acc, value) => Object.assign(acc!, value), {})! as T;
  };

  playerStatsArray = (playerElement: Cheerio<Element>) => {
    return playerElement.find("td").toArray();
  };

  playerMultikillStats = async (
    playerElement: Cheerio<Element>
  ): Promise<IMultikill> => {
    const playerStatsArray = this.playerStatsArray(playerElement).map(
      (statsElement, index) => {
        const stats = this.$(statsElement);

        switch (index) {
          case this.MULTIKILL_5K_INDEX:
            return this.multikillInfo(stats, 5);
          case this.MULTIKILL_4K_INDEX:
            return this.multikillInfo(stats, 4);
          case this.MULTIKILL_3K_INDEX:
            return this.multikillInfo(stats, 3);
          case this.MULTIKILL_2K_INDEX:
            return this.multikillInfo(stats, 2);
          case this.MULTIKILL_1K_INDEX:
            return this.multikillInfo(stats, 1);
        }
      }
    );

    const playerMatchStats = this.normalizeArray<IMultikill>(playerStatsArray);

    return playerMatchStats;
  };
  playerMatchStats = async (
    playerElement: Cheerio<Element>
  ): Promise<IPlayerMatchStats> => {
    const playerStatsArray = this.playerStatsArray(playerElement).map(
      (statsElement, index) => {
        const stats = this.$(statsElement);

        switch (index) {
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
          case this.AVERAGE_DAMAGE_PER_ROUND_INDEX:
            return this.averageDamagePerRoundInfo(stats);
          case this.HEADSHOT_PERCENTAGE_INDEX:
            return this.headshotPercentageInfo(stats);
          case this.KAST_INDEX:
            return this.kastInfo(stats);
          case this.ENEMIES_FLASHED_INDEX:
            return this.enemiesFlashedInfo(stats);
          case this.FLASH_ASSISTS_INDEX:
            return this.flashAssistsInfo(stats);
          case this.ENEMIES_BLIND_TIME_INDEX:
            return this.enemiesBlindTimeInfo(stats);
          case this.UTILITY_DAMAGE_INDEX:
            return this.utilityDamageInfo(stats);
          case this.CLUTCH_1VX_INDEX:
            return this.clutch1vxInfo(stats);
          case this.TRADE_KILLS_INDEX:
            return this.tradeKillsInfo(stats);
        }
      }
    );

    const playerMatchStats: IPlayerMatchStats =
      this.normalizeArray<IPlayerMatchStats>(playerStatsArray);

    Object.assign(playerMatchStats, {
      multikill: await this.playerMultikillStats(playerElement),
    });

    return playerMatchStats;
  };

  playerInfoStats = async (
    playerElement: Cheerio<Element>
  ): Promise<IPlayerMatchInfo> => {
    const playerStatsArray = this.playerStatsArray(playerElement).map(
      (statsElement, index) => {
        const stats = this.$(statsElement);

        switch (index) {
          case this.PLAYER_INFO_INDEX:
            return this.playerInfo(stats);
        }
      }
    );

    const playerInfoStats =
      this.normalizeArray<IPlayerMatchInfo>(playerStatsArray);

    return playerInfoStats;
  };

  playerStats = async (
    playerElement: Cheerio<Element>
  ): Promise<IPlayerInfo> => {
    const playerInfo: IPlayerInfo = {
      playerInfo: await this.playerInfoStats(playerElement),
      matchStats: await this.playerMatchStats(playerElement),
    };

    return playerInfo;
  };

  playerInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchInfo> => {
    const imageUrl = stats.find("img").attr("src");
    const name = stats.find("a > span").text();
    const platformPlayerId = stats
      .find("a")
      .attr("href")
      ?.split("/")
      .slice(-1)[0];

    return { imageUrl, name, platformPlayerId };
  };

  killsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const kills = Number(stats.text());

    return { kills };
  };

  deathsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const deaths = Number(stats.text());

    return { deaths };
  };

  assistsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const assists = Number(stats.text());

    return { assists };
  };

  killDeathDifferenceInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const killDeathDifference = Number(stats.text());

    return { killDeathDifference };
  };

  killDeathRatioInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const killDeathRatio = Number(stats.text());

    return { killDeathRatio };
  };

  averageDamagePerRoundInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const averageDamagePerRound = Number(stats.text());

    return { averageDamagePerRound };
  };

  headshotPercentageInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const headshotPercentage = Number(stats.text().replace("%", "")) / 100;

    return { headshotPercentage };
  };

  kastInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const kast = Number(stats.text().replace("%", "")) / 100;

    return { kast };
  };

  enemiesFlashedInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const enemiesFlashed = Number(stats.text());

    return { enemiesFlashed };
  };

  flashAssistsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const flashAssists = Number(stats.text());

    return { flashAssists };
  };

  /**
   * An integer value that represents the amount of seconds
   * an enemy was blinded due the player's flashbang
   */
  enemiesBlindTimeInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const enemiesBlindTime = Number(stats.text().replace(/[A-Za-z]/g, ""));

    return { enemiesBlindTime };
  };

  utilityDamageInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const utilityDamage = Number(stats.text());

    return { utilityDamage };
  };

  clutch1vxInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const clutch1vx = Number(stats.text());

    return { clutch1vx };
  };

  tradeKillsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const tradeKills = Number(stats.text());

    return { tradeKills };
  };

  multikillInfo = (
    stats: Cheerio<Element>,
    multikillValue: number
  ): Partial<IMultikill> => {
    const multikill = Number(stats.text());

    return { [`_${multikillValue}k`]: multikill };
  };
}
