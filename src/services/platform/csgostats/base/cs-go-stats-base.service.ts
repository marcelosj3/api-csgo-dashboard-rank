import { CheerioAPI, load } from "cheerio";

import { PlatformNames } from "../../../../enums";
import { PlatformBase } from "../../base";

export class CSGOStatsBase extends PlatformBase {
  platform: PlatformNames = PlatformNames.CSGOSTATS;
  baseUrl: string = "https://csgostats.gg";
  playerUrlEndpoint: string = "/player/";
  matchUrlEndpoint: string = "/match/";

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
