import { Page } from "playwright";

import { CSGOStatsMatchInfo } from "./cs-go-stats-match-info.service";

class CSGOStats extends CSGOStatsMatchInfo {
  matchInfo = async (page: Page, url: string) => {
    this.$ = await this.content(page);
    this.match = await this.matchDetails(url);
    const [team_1, team_2] = await this.teamDetails();

    return { match: this.match, team_1, team_2 };
  };
}

export default new CSGOStats();
