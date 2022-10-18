import { Page, Locator } from "@playwright/test";

export class PlanetCard {
  readonly page: Page;
  readonly planetCards: Locator;
  readonly planetName: Locator;
  readonly planetPopulation: Locator;
  readonly planetClimate: Locator;
  readonly planetGravity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.planetCards = page.getByTestId("planet-card");
    this.planetName = this.planetCards.locator("h6");
    this.planetPopulation = page.getByTestId("planet-population");
    this.planetClimate = page.getByTestId("planet-climate");
    this.planetGravity = page.getByTestId("planet-gravity");
  }
}
