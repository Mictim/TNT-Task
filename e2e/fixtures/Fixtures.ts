import { test as base } from "@playwright/test";
import { MainPage } from "../pages/MainPage";
import { PeopleCard } from "../pages/PeopleCard";
import { PlanetSteps } from "../steps/PlanetSteps";
import { CommonSteps } from "../steps/CommonSteps";
import { PlanetCard } from '../pages/PlanetCard';

export type TestOptions = {
  mainPage: MainPage;
  planetSteps: PlanetSteps;
  peopleCard: PeopleCard;
  commonSteps: CommonSteps;
  planetCard: PlanetCard;
};

export const test = base.extend<TestOptions>({
  page: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(baseURL!, { waitUntil: "domcontentloaded" });
    await use(page);
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  planetSteps: async ({ page }, use) => {
    await use(new PlanetSteps(page));
  },
  peopleCard: async ({ page }, use) => {
    await use(new PeopleCard(page));
  },
  commonSteps: async ({ page }, use) => {
    await use(new CommonSteps(page));
  },
  planetCard: async ({ page }, use) => {
    await use(new PlanetCard(page));
  },
});

export { expect } from "@playwright/test";
