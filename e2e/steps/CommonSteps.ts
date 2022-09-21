import { test, Locator, Page } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

export class CommonSteps {
  readonly page: Page;
  readonly mainPage: MainPage;

  constructor(page: Page) {
    this.page = page;
    this.mainPage = new MainPage(page);
  }

  async getResponseOnBtnClick(button: Locator, url: string): Promise<any> {
    const [response] = await Promise.all([
      this.page.waitForResponse(url),
      button.click(),
    ]);
    if (response.status() === 200) {
        const buffer: Buffer = Buffer.from(JSON.stringify(await response.json()));
        test.info().attachments.push({name: "Swapi Response", path: "swapi.json",  body: buffer, contentType: "application/json"});
        return response.json();
    } else {
      throw new Error(`Response failed with status: ${response.status()}`);
    }
  }

  async fillSearchCriteria(
    radioBtn: Locator,
    searchQuery: string
  ): Promise<any> {
    await radioBtn.click();
    await this.mainPage.searchInput.fill(searchQuery);
    return this.getResponseOnBtnClick(
      await this.mainPage.searchBtn,
      `**/?search=${searchQuery}`
    );
  }

  async getScrShot(element: Locator, filename: string) {
    const buffer = await element.screenshot();
    test.info().attachments.push({name: filename, path: `${filename}.png`,  body: buffer, contentType: "image/png"});
  }
}
