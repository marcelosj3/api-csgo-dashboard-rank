import { Page } from "playwright";
import { CheerioAPI, load } from "cheerio";

import { Platform } from "../../../enums";
import { IMatchDetails, IPlayerInfo } from "../../../interfaces/";

export class CSGOStatsBase {
  platform: Platform = Platform.CSGOSTATS;
  match: IMatchDetails;
  team_1: IPlayerInfo[];
  team_2: IPlayerInfo[];
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
}
