import { Request } from "express";

import { IMatchPlayerInfo } from "../interfaces/match-player/match-player.interface";
import { pageLaunch } from "../utils/playwright";
class MatchesService {
  insertMatch = async ({ body }: Request) => {
    const page = await pageLaunch(body);

    const match: IMatchPlayerInfo = { match: {}, team_1: [], team_2: [] };
    const matchInfo = await page.$$eval(
      "table#match-scoreboard",
      (thisTable, match) => {
        const table = thisTable[0];

        const TEAM_1_INDEX = 3;
        const TEAM_2_INDEX = 9;

        const team_1 = table.childNodes[TEAM_1_INDEX].childNodes;
        const team_2 = table.childNodes[TEAM_2_INDEX].childNodes;

        const teams = [team_1, team_2];

        const PLAYERS_INDEX_START = 1;

        teams.forEach((team, team_index) => {
          team.forEach((players, player_index) => {
            if (player_index > PLAYERS_INDEX_START) {
              players.childNodes.forEach((stats, index) => {
                if (index == 1) {
                  const imageUrl = (stats.childNodes[1] as HTMLImageElement)
                    .src;
                  const name = (
                    stats.childNodes[3].childNodes[1] as HTMLSpanElement
                  ).innerText;

                  // TODO figure it out how to type this
                  // @ts-ignore
                  match[`team_${team_index + 1}`].push({ name, imageUrl });
                }
              });
            }
          });
        });

        return match;
      },
      match
    );

    await page.close();

    return { status: 200, message: { ...matchInfo } };
  };
}

export default new MatchesService();
