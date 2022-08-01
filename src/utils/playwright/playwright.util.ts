import playwright, { Page, Browser, LaunchOptions } from "playwright";

class Playwright {
  private launchOptions: LaunchOptions = {
    headless: false,
  };
  private browser: Browser;
  public page: Page;

  launchPage = async (url: string): Promise<Page> => {
    this.browser = await playwright.chromium.launch(this.launchOptions);
    this.page = await this.browser.newPage();
    await this.page.goto(url);

    return this.page;
  };

  close = async () => {
    await this.page.close();
    await this.browser.close();
  };
}

export default new Playwright();
