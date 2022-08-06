import { Browser, PuppeteerLaunchOptions } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { TPage } from "../../types";

class Puppeteer {
  private launchOptions: PuppeteerLaunchOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };
  private browser: Browser;
  public page: TPage;

  launchPage = async (url: string): Promise<TPage> => {
    puppeteer.use(StealthPlugin());
    this.browser = await puppeteer.launch(this.launchOptions);
    this.page = await this.browser.newPage();
    await this.page.goto(url);

    return this.page;
  };

  close = async () => {
    await this.page.close();
    await this.browser.close();
  };
}

export default new Puppeteer();
