import { Locator, Page } from "@playwright/test";

export class MainPage {
  readonly page: Page;
  readonly peopleRadio: Locator;
  readonly planetRadio: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleRadio = page.getByTestId("people-radio");
    this.planetRadio = page.getByTestId("planet-radio");
    this.searchInput = page.getByTestId("search-input");
    this.searchBtn = page.getByTestId("search-btn");
  }
}
