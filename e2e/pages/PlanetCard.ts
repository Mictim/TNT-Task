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
    this.planetCards = page.locator("data-test-id=planet-card");
    this.planetName = page.locator("data-test-id=planet-card >> h6");
    this.planetPopulation = page.locator("data-test-id=planet-population");
    this.planetClimate = page.locator("data-test-id=planet-climate");
    this.planetGravity = page.locator("data-test-id=planet-gravity");
  }
}
