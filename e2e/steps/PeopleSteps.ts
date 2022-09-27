import { Page, expect } from "@playwright/test";
import { Character } from "../model/entity/Character";
import { PeopleCard } from "../pages/PeopleCard";
import { CommonSteps } from "./CommonSteps";

export class PeopleSteps extends CommonSteps {
  readonly peopleCard: PeopleCard;

  constructor(page: Page) {
    super(page);
    this.peopleCard = new PeopleCard(page);
  }

  async fillSearchQueryWithCharacter(characterName: string): Promise<Array<Character>> {
    const response = await this.fillSearchCriteria(
      await this.mainPage.peopleRadio,
      characterName
    );
    const results = response.results;
    let people = Array<Character>(results.length);
    for (let i = 0; i < results.length; i++) {
      people.push(
        new Character()
          .withName(results[i].name.trim())
          .withGender(results[i].gender.trim())
          .withBirthYear(results[i].birth_year.trim())
          .withEyeColor(results[i].eye_color.trim())
          .withSkinColor(results[i].skin_color.trim())
      );
    }
    return people;
  }

  async collectUiResultsForCharacterSearch(): Promise<Array<Character>> {
    const resultsSize = this.peopleCard.peopleCard.count();
    let people = Array<Character>(await resultsSize);
    for (let i = 0; i < (await resultsSize); i++) {
      people.push(
        new Character()
          .withName(await (await this.peopleCard.characterName.nth(i).innerText()).trim())
          .withGender(await (await this.peopleCard.characterGender.nth(i).innerText()).trim())
          .withBirthYear(await (await this.peopleCard.characterBirthYear.nth(i).innerText()).trim())
          .withEyeColor(await (await this.peopleCard.characterEyeColor.nth(i).innerText()).trim())
          .withSkinColor(await (await this.peopleCard.characterSkinColor.nth(i).innerText()).trim())
      );
      await this.getScrShot(
        await this.peopleCard.peopleCard.nth(i),
        await this.peopleCard.characterName.nth(i).innerText()
      );
    }
    return people;
  }

  async assertExpectedAndActualResult(expected: Array<Character>, actual: Array<Character>): Promise<void> {
    await expect.soft(await actual,
        `Assert that actual character props are the same as expected`).toEqual(await expected);
  }
}
