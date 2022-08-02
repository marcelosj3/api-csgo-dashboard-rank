import { Page } from "playwright";
import { IMatchPlayerInfo, IPlayer } from "../../../interfaces";

import { CSGOStatsBase } from "./cs-go-stats-base.service";
import { CSGOStatsMatchInfo } from "./cs-go-stats-match-info.service";
import { CSGOStatsPlayerInfo } from "./cs-go-stats-player-info.service";

class CSGOStats extends CSGOStatsBase {
  playerInfoClass = new CSGOStatsPlayerInfo();
  matchInfoClass = new CSGOStatsMatchInfo();

  matchInfo = async (page: Page, url: string): Promise<IMatchPlayerInfo> => {
    this.$ = await this.matchInfoClass.content(page);
    this.match = await this.matchInfoClass.matchDetails(url);
    const [team_1, team_2] = await this.matchInfoClass.teamDetails();

    return { match: this.match, team_1, team_2 };
  };

  playerInfo = async (page: Page, url: string): Promise<IPlayer> => {
    this.$ = await this.playerInfoClass.content(page);
    const playerInfo = await this.playerInfoClass.playerDetails(page, url);

    return playerInfo;
  };
}

export default new CSGOStats();
