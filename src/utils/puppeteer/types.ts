import { Page as PuppeteerPage } from "puppeteer";

export type Page = Omit<PuppeteerPage, "exposeBinding">;
