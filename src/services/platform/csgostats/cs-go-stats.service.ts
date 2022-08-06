import { IMatchPlayerInfo, IPlayer } from "../../../interfaces";
import { TPage, TPuppeteer } from "../../../types";

import { CSGOStatsBase } from "./base";
import { CSGOStatsMatchInfo } from "./match";
import { CSGOStatsPlayerInfo } from "./player";

class CSGOStats extends CSGOStatsBase {
  playerInfoClass = new CSGOStatsPlayerInfo();
  matchInfoClass = new CSGOStatsMatchInfo();

  createMatchInfo = async (
    page: TPage,
    url: string
  ): Promise<IMatchPlayerInfo> => {
    this.$ = await this.matchInfoClass.content(page);
    this.match = await this.matchInfoClass.matchDetails(url);
    this.players = await this.matchInfoClass.teamDetails();

    return { match: this.match, players: this.players };
  };

  playerInfo = async (
    page: TPage,
    playerId: string,
    puppeteer: TPuppeteer
  ): Promise<IPlayer> => {
    this.$ = await this.playerInfoClass.content(page);
    const playerInfo = await this.playerInfoClass.playerDetails(playerId);

    await puppeteer.close();

    return playerInfo;
  };
}

export default new CSGOStats();
