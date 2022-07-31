import { Request } from "express";

import playwright, { Page } from "playwright";

export const pageLaunch = async (body: Request): Promise<Page> => {
  const launchOptions = {
    headless: false,
  };

  const browser = await playwright.chromium.launch(launchOptions);
  const page = await browser.newPage();
  await page.goto(body.url);

  return page;
};
