import { CheerioAPI, load } from "cheerio";

import { PlatformNames } from "../../../enums";
import { IMatchDetails, IPlayerMatchInfo } from "../../../interfaces/";
import { Page } from "../../../utils/puppeteer";

export class CSGOStatsBase {
  platform: PlatformNames = PlatformNames.CSGOSTATS;
  match: IMatchDetails;
  // TODO change theses teams to an only players array
  team_1: IPlayerMatchInfo[];
  team_2: IPlayerMatchInfo[];
  $: CheerioAPI;

  content = async (page: Page) => {
    const rawContent = await page.content();
    const content = load(rawContent);

    this.$ = content;
    return this.$;
  };

  dateHandler = (date: string) => {
    let [day, month, year, time] = date.split(" ");

    day = day.replace(/\D/g, "");

    const matchDate = new Date(`${month} ${day} ${year} ${time}`);

    // The date comes with the local timezone but is already a TZ0 value, this
    // method below decreases the time by the timezone to return a correct date
    matchDate.setTime(
      matchDate.getTime() - matchDate.getTimezoneOffset() * 60 * 1000
    );

    return matchDate;
  };

  normalizeArrayToObject = <T>(array: Partial<T | undefined>[]): T => {
    return array
      .filter((element) => element)
      .reduce((acc, value) => Object.assign(acc!, value), {})! as T;
  };
}
