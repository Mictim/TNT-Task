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
    this.peopleCard = page.getByTestId("people-card");
    this.characterName = this.peopleCard.locator("h6");
    this.characterGender = page.getByTestId("gender");
    this.characterBirthYear = page.getByTestId("birth-year");
    this.characterEyeColor = page.getByTestId("eyes-color");
    this.characterSkinColor = page.getByTestId("skin-color");
  }
}
