import { Request } from "express";

import { Playwright } from "../utils/playwright";
import { CSGOStats } from "./platform";
class MatchesService {
  private playwright = Playwright;
  private platformService = CSGOStats;

  insertMatch = async ({ body }: Request) => {
    const { url } = body;

    const page = await this.playwright.launchPage(url);

    const matchInfo = await this.platformService.matchInfo(page, url);

    await this.playwright.close();

    return { status: 200, message: matchInfo };
  };
}

export default new MatchesService();
