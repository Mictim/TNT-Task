import { Page, expect } from "@playwright/test";
import { Planet } from "../model/entity/Planet";
import { PlanetCard } from "../pages/PlanetCard";
import { CommonSteps } from "./CommonSteps";

export class PlanetSteps extends CommonSteps {
  readonly planetCard: PlanetCard;

  constructor(page: Page) {
    super(page);
    this.planetCard = new PlanetCard(page);
  }

  async fillSearchQueryWithPlanet(planetName: string): Promise<Array<Planet>> {
    const response = await this.fillSearchCriteria(
      await this.mainPage.planetRadio,
      planetName
    );
    const results = response.results;
    let planets = Array<Planet>(results.length);
    for (let i = 0; i < results.length; i++) {
      planets.push(
        new Planet()
          .withName(results[i].name.trim())
          .withPopulation(results[i].population.trim())
          .withClimate(results[i].climate.trim())
          .withGravity(results[i].gravity.trim())
      );
    }
    return planets;
  }

  async collectUiResultsForPlanetSearch(): Promise<Array<Planet>> {
    const resultsSize = this.planetCard.planetCards.count();
    let planets = Array<Planet>(await resultsSize);
    for (let i = 0; i < (await resultsSize); i++) {
      planets.push(
        new Planet()
          .withName(
            await (await this.planetCard.planetName.nth(i).innerText()).trim()
          )
          .withPopulation(
            await (
              await this.planetCard.planetPopulation.nth(i).innerText()
            ).trim()
          )
          .withClimate(
            await (
              await this.planetCard.planetClimate.nth(i).innerText()
            ).trim()
          )
          .withGravity(
            await (
              await this.planetCard.planetGravity.nth(i).innerText()
            ).trim()
          )
      );
      await this.getScrShot(
        await this.planetCard.planetCards.nth(i),
        await this.planetCard.planetName.nth(i).innerText()
      );
    }
    return planets;
  }

  async assertExpectedAndActualResult(
    expected: Array<Planet>,
    actual: Array<Planet>
  ): Promise<void> {
    await expect
      .soft(
        await actual,
        `Assert that actual planet props are the same as expected`
      )
      .toEqual(await expected);
  }
}
