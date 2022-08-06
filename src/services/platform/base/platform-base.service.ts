import { CheerioAPI, load } from "cheerio";

import { PlatformNames } from "../../../enums";
import { IMatchDetails, IPlayerAndMatchStatsInfo } from "../../../interfaces";
import { Page } from "../../../utils";

export class PlatformBase {
  platform: PlatformNames;
  match: IMatchDetails;
  players: IPlayerAndMatchStatsInfo[];
  $: CheerioAPI;
  baseUrl: string;
  playerUrlEndpoint: string;
  matchUrlEndpoint: string;
  steamProfileEndpoint: string = "https://steamcommunity.com/profiles/";

  content = async (page: Page) => {
    const rawContent = await page.content();
    const content = load(rawContent);

    this.$ = content;
    return this.$;
  };

  dateHandler = (date: string) => {
    const matchDate = new Date(date);
    return matchDate;
  };

  normalizeArrayToObject = <T>(array: Partial<T | undefined>[]): T => {
    return array
      .filter((element) => element)
      .reduce((acc, value) => Object.assign(acc!, value), {})! as T;
  };
}
