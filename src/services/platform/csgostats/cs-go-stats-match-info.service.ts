import { Teams } from "../../../enums";
import { IMatchDetails, IPlayerInfo } from "../../../interfaces";

import { CSGOStatsPlayerInfo } from "./cs-go-stats-player-info.service";

export class CSGOStatsMatchInfo extends CSGOStatsPlayerInfo {
  matchId = (url: string): string => {
    return url.split("/").slice(-1)[0];
  };

  matchDetails = async (url: string): Promise<IMatchDetails> => {
    const CONTENT_PATH = "div#match-details";
    const MAP_NAME_PATH = ".map-text";
    const DATE_PATH = ".match-date-text";

    const details = this.$(CONTENT_PATH);

    const mapName = details.find(MAP_NAME_PATH).text();
    const matchDate = this.dateHandler(details.find(DATE_PATH).text());
    const platform_id = this.matchId(url);

    return {
      platform: this.platform,
      date: matchDate,
      platformMatchId: platform_id,
      mapName,
      matchUrl: "123",
      scoreboard: { team1Rounds: 1, team2Rounds: 3, winner: Teams.TEAM_1 },
    };
  };

  teamDetails = async (): Promise<IPlayerInfo[][]> => {
    const TEAMS_INDEXES = [0, 2];
    const TEAM_STAT_INDEX = 0;

    const teamInfo = this.$("table#match-scoreboard");

    const teams = teamInfo
      .find("tbody")
      .toArray()
      .filter((_, index) => TEAMS_INDEXES.includes(index))
      .map((element) => this.$(element));

    const teamStats: IPlayerInfo[][] = [];
    for (const team of teams) {
      const players = team
        .find("tr")
        .toArray()
        .map((player) => this.$(player));

      const playerStat: IPlayerInfo[] = [];

      for (const player of players) {
        const playerIndex = players.indexOf(player);

        switch (playerIndex) {
          case TEAM_STAT_INDEX:
            break;
          default:
            playerStat.push(await this.playerStats(player));
        }
      }

      teamStats.push(playerStat);
    }

    return teamStats;
  };
}
