import {
  IMatchDetails,
  IPlayerAndMatchStatsInfo,
} from "../../../../interfaces";

import { CSGOStatsMatchPlayerInfo } from "./cs-go-stats-match-player-info.service";

export class CSGOStatsMatchInfo extends CSGOStatsMatchPlayerInfo {
  // TODO merge this method with others that do the same function
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
    const platformId = this.matchId(url);

    const teamValuesClasses = "> .team-score-inner > .team-score-number";
    const team1Rounds = Number(
      details.find(`.team-0-score ${teamValuesClasses}`).text()
    );
    const team2Rounds = Number(
      details.find(`.team-1-score ${teamValuesClasses}`).text()
    );

    return {
      platform: this.platform,
      date: matchDate,
      platformMatchId: platformId,
      mapName,
      matchUrl: url,
      scoreboard: {
        team1Rounds,
        team2Rounds,
      },
    };
  };

  teamDetails = async (): Promise<IPlayerAndMatchStatsInfo[]> => {
    const TEAMS_INDEXES = [0, 2];
    const TEAM_STAT_INDEX = 0;

    const teamInfo = this.$("table#match-scoreboard");

    const teams = teamInfo
      .find("tbody")
      .toArray()
      .filter((_, index) => TEAMS_INDEXES.includes(index))
      .map((element) => this.$(element));

    const teamStats: IPlayerAndMatchStatsInfo[][] = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];

      const players = team
        .find("tr")
        .toArray()
        .map((player) => this.$(player));

      const matchPlayer: IPlayerAndMatchStatsInfo[] = [];

      for (const player of players) {
        const playerIndex = players.indexOf(player);

        switch (playerIndex) {
          case TEAM_STAT_INDEX:
            break;
          default:
            matchPlayer.push(await this.matchPlayer(player, i + 1));
        }
      }

      teamStats.push(matchPlayer);
    }

    return teamStats.flat();
  };
}
