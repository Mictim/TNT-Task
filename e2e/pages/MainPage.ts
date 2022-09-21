import { Locator, Page } from "@playwright/test";

export class MainPage {
  readonly page: Page;
  readonly peopleRadio: Locator;
  readonly planetRadio: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleRadio = page.locator("data-test-id=people-radio");
    this.planetRadio = page.locator("data-test-id=planet-radio");
    this.searchInput = page.locator("data-test-id=search-input");
    this.searchBtn = page.locator("data-test-id=search-btn");
  }
}
