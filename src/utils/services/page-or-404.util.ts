import { load } from "cheerio";

import { NotFoundError } from "../../errors";
import { TPage, TPuppeteer } from "../../types";

export const pageOr404 = async (
  url: string,
  puppeteer: TPuppeteer,
  notFoundKey: string
): Promise<TPage> => {
  const page = await puppeteer.launchPage(url);

  const rawContent = await page.content();
  const content = load(rawContent);

  const has404 = content("h1").text().includes("404");

  if (has404) {
    puppeteer.close();
    throw new NotFoundError(notFoundKey);
  }

  return page;
};
