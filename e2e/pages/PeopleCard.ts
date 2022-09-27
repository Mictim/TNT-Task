import { Locator, Page } from "@playwright/test";

export class PeopleCard {
  readonly page: Page;
  readonly peopleCard: Locator;
  readonly characterName: Locator;
  readonly characterGender: Locator;
  readonly characterBirthYear: Locator;
  readonly characterEyeColor: Locator;
  readonly characterSkinColor: Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleCard = page.locator("data-test-id=people-card");
    this.characterName = this.peopleCard.locator("h6");
    this.characterGender = page.locator("data-test-id=gender");
    this.characterBirthYear = page.locator("data-test-id=birth-year");
    this.characterEyeColor = page.locator("data-test-id=eyes-color");
    this.characterSkinColor = page.locator("data-test-id=skin-color");
  }
}
