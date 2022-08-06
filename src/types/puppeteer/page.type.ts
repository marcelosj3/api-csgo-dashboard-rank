import { Page as PuppeteerPage } from "puppeteer";

export type TPage = Omit<PuppeteerPage, "exposeBinding">;
