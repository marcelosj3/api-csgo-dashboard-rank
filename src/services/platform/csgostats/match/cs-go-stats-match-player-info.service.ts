import { Cheerio, Element } from "cheerio";

import { Teams } from "../../../../enums";
import {
  IMultikill,
  IPlayerAndMatchStatsInfo,
  IPlayerMatchInfo,
  IPlayerMatchStats,
} from "../../../../interfaces";

import { CSGOStatsBase } from "../base";

export class CSGOStatsMatchPlayerInfo extends CSGOStatsBase {
  MATCH_PLAYER_INFO_INDEX = 0;
  MATCH_KILLS_INFO_INDEX = 2;
  MATCH_DEATHS_INFO_INDEX = 3;
  MATCH_ASSISTS_INFO_INDEX = 4;
  MATCH_KILL_DEATH_DIFFERENCE_INDEX = 5;
  MATCH_KILL_DEATH_RATIO_INDEX = 6;
  MATCH_AVERAGE_DAMAGE_PER_ROUND_INDEX = 7;
  MATCH_HEADSHOT_PERCENTAGE_INDEX = 8;
  MATCH_KAST_INDEX = 9;
  MATCH_ENEMIES_FLASHED_INDEX = 11;
  MATCH_FLASH_ASSISTS_INDEX = 12;
  MATCH_ENEMIES_BLIND_TIME_INDEX = 13;
  MATCH_UTILITY_DAMAGE_INDEX = 14;
  MATCH_CLUTCH_1VX_INDEX = 30;
  MATCH_TRADE_KILLS_INDEX = 22;
  MATCH_MULTIKILL_5K_INDEX = 37;
  MATCH_MULTIKILL_4K_INDEX = 38;
  MATCH_MULTIKILL_3K_INDEX = 39;
  MATCH_MULTIKILL_2K_INDEX = 40;
  MATCH_MULTIKILL_1K_INDEX = 41;

  matchPlayerStatsArray = (playerElement: Cheerio<Element>) => {
    return playerElement.find("td").toArray();
  };

  matchPlayerInfoStats = async (
    playerElement: Cheerio<Element>
  ): Promise<IPlayerMatchInfo> => {
    const matchPlayerStatsArray = this.matchPlayerStatsArray(playerElement).map(
      (statsElement, index) => {
        const stats = this.$(statsElement);

        switch (index) {
          case this.MATCH_PLAYER_INFO_INDEX:
            return this.matchPlayerInfo(stats);
        }
      }
    );

    const playerInfoStats = this.normalizeArrayToObject<IPlayerMatchInfo>(
      matchPlayerStatsArray
    );

    return playerInfoStats;
  };

  matchPlayer = async (
    playerElement: Cheerio<Element>,
    teamIndex: number
  ): Promise<IPlayerAndMatchStatsInfo> => {
    const matchPlayerInfo: IPlayerAndMatchStatsInfo = {
      playerInfo: await this.matchPlayerInfoStats(playerElement),
      matchStats: await this.matchPlayerStats(playerElement, teamIndex),
    };

    return matchPlayerInfo;
  };

  matchPlayerInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchInfo> => {
    const imageUrl = stats.find("img").attr("src");
    const name = stats.find("a > span").text();
    const platformPlayerId = stats
      .find("a")
      .attr("href")
      ?.split("/")
      .slice(-1)[0];

    return { imageUrl, name, platformPlayerId };
  };

  matchPlayerMultikillStats = async (
    playerElement: Cheerio<Element>
  ): Promise<IMultikill> => {
    const matchPlayerStatsArray = this.matchPlayerStatsArray(playerElement).map(
      (statsElement, index) => {
        const stats: Cheerio<Element> = this.$(statsElement);

        switch (index) {
          case this.MATCH_MULTIKILL_5K_INDEX:
            return this.matchMultikillInfo(stats, 5);
          case this.MATCH_MULTIKILL_4K_INDEX:
            return this.matchMultikillInfo(stats, 4);
          case this.MATCH_MULTIKILL_3K_INDEX:
            return this.matchMultikillInfo(stats, 3);
          case this.MATCH_MULTIKILL_2K_INDEX:
            return this.matchMultikillInfo(stats, 2);
          case this.MATCH_MULTIKILL_1K_INDEX:
            return this.matchMultikillInfo(stats, 1);
        }
      }
    );

    const playerMatchStats = this.normalizeArrayToObject<IMultikill>(
      matchPlayerStatsArray
    );

    return playerMatchStats;
  };

  matchGetTeam = (teamIndex: number): Teams => {
    const team = Teams.TEAM_1.includes(String(teamIndex))
      ? Teams.TEAM_1
      : Teams.TEAM_2;

    return team;
  };

  matchPlayerStats = async (
    playerElement: Cheerio<Element>,
    teamIndex: number
  ): Promise<IPlayerMatchStats> => {
    const matchPlayerStatsArray = this.matchPlayerStatsArray(playerElement).map(
      (statsElement, index) => {
        const stats = this.$(statsElement);

        switch (index) {
          case this.MATCH_KILLS_INFO_INDEX:
            return this.matchKillsInfo(stats);
          case this.MATCH_DEATHS_INFO_INDEX:
            return this.matchDeathsInfo(stats);
          case this.MATCH_ASSISTS_INFO_INDEX:
            return this.matchAssistsInfo(stats);
          case this.MATCH_KILL_DEATH_DIFFERENCE_INDEX:
            return this.matchKillDeathDifferenceInfo(stats);
          case this.MATCH_KILL_DEATH_RATIO_INDEX:
            return this.matchKillDeathRatioInfo(stats);
          case this.MATCH_AVERAGE_DAMAGE_PER_ROUND_INDEX:
            return this.matchAverageDamagePerRoundInfo(stats);
          case this.MATCH_HEADSHOT_PERCENTAGE_INDEX:
            return this.matchHeadshotPercentageInfo(stats);
          case this.MATCH_KAST_INDEX:
            return this.matchKastInfo(stats);
          case this.MATCH_ENEMIES_FLASHED_INDEX:
            return this.matchEnemiesFlashedInfo(stats);
          case this.MATCH_FLASH_ASSISTS_INDEX:
            return this.matchFlashAssistsInfo(stats);
          case this.MATCH_ENEMIES_BLIND_TIME_INDEX:
            return this.matchEnemiesBlindTimeInfo(stats);
          case this.MATCH_UTILITY_DAMAGE_INDEX:
            return this.matchUtilityDamageInfo(stats);
          case this.MATCH_CLUTCH_1VX_INDEX:
            return this.matchClutch1vxInfo(stats);
          case this.MATCH_TRADE_KILLS_INDEX:
            return this.matchTradeKillsInfo(stats);
        }
      }
    );

    const playerMatchStats: IPlayerMatchStats =
      this.normalizeArrayToObject<IPlayerMatchStats>(matchPlayerStatsArray);

    Object.assign(playerMatchStats, {
      multikill: await this.matchPlayerMultikillStats(playerElement),
      team: this.matchGetTeam(teamIndex),
    });

    return playerMatchStats;
  };

  matchKillsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const kills = Number(stats.text());

    return { kills };
  };

  matchDeathsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const deaths = Number(stats.text());

    return { deaths };
  };

  matchAssistsInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const assists = Number(stats.text());

    return { assists };
  };

  matchKillDeathDifferenceInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const killDeathDifference = Number(stats.text());

    return { killDeathDifference };
  };

  matchKillDeathRatioInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const killDeathRatio = Number(stats.text());

    return { killDeathRatio };
  };

  matchAverageDamagePerRoundInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const averageDamagePerRound = Number(stats.text());

    return { averageDamagePerRound };
  };

  matchHeadshotPercentageInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const headshotPercentage = Number(stats.text().replace("%", "")) / 100;

    return { headshotPercentage };
  };

  matchKastInfo = (stats: Cheerio<Element>): Partial<IPlayerMatchStats> => {
    const kast = Number(stats.text().replace("%", "")) / 100;

    return { kast };
  };

  matchEnemiesFlashedInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const enemiesFlashed = Number(stats.text());

    return { enemiesFlashed };
  };

  matchFlashAssistsInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const flashAssists = Number(stats.text());

    return { flashAssists };
  };

  /**
   * An integer value that represents the amount of seconds
   * an enemy was blinded due the player's flashbang
   */
  matchEnemiesBlindTimeInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const enemiesBlindTime = Number(stats.text().replace(/[A-Za-z]/g, ""));

    return { enemiesBlindTime };
  };

  matchUtilityDamageInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const utilityDamage = Number(stats.text());

    return { utilityDamage };
  };

  matchClutch1vxInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const clutch1vx = Number(stats.text());

    return { clutch1vx };
  };

  matchTradeKillsInfo = (
    stats: Cheerio<Element>
  ): Partial<IPlayerMatchStats> => {
    const tradeKills = Number(stats.text());

    return { tradeKills };
  };

  matchMultikillInfo = (
    stats: Cheerio<Element>,
    multikillValue: number
  ): Partial<IMultikill> => {
    const multikill = Number(stats.text());

    return { [`_${multikillValue}k`]: multikill };
  };
}
