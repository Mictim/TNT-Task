import { selectors, test as base } from "@playwright/test";
import { MainPage } from "../pages/MainPage";
import { PeopleCard } from "../pages/PeopleCard";
import { PlanetSteps } from "../steps/PlanetSteps";
import { CommonSteps } from "../steps/CommonSteps";
import { PlanetCard } from '../pages/PlanetCard';
import { PeopleSteps } from "../steps/PeopleSteps";

export type TestOptions = {
  mainPage: MainPage;
  planetSteps: PlanetSteps;
  peopleSteps: PeopleSteps;
  commonSteps: CommonSteps;
  planetCard: PlanetCard;
  peopleCard: PeopleCard;
};

export const test = base.extend<TestOptions>({
  page: async ({ browser, baseURL }, use) => {
    selectors.setTestIdAttribute("data-test-id");
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(baseURL!, { waitUntil: "domcontentloaded", timeout: 90000 });
    await use(page);
    await page.close();
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  commonSteps: async ({ page }, use) => {
    await use(new CommonSteps(page));
  },
  planetSteps: async ({ page }, use) => {
    await use(new PlanetSteps(page));
  },
  peopleSteps: async ({ page }, use) => {
    await use(new PeopleSteps(page));
  },
  planetCard: async ({ page }, use) => {
    await use(new PlanetCard(page));
  },
  peopleCard: async ({ page }, use) => {
    await use(new PeopleCard(page));
  },
});

export { expect } from "@playwright/test";
