import { test, expect } from "../fixtures/Fixtures";
import { planets } from '../resources/planets';
import { people } from "../resources/people";
import { allure } from "allure-playwright";
import { NOT_FOUND, NO_CARD_MSG, NOT_FOUND_MSG } from '../support/contants';
import * as testData from "../resources/testData.json";

test.describe.parallel('Verify search functionality for Star Wars Search Portal', async() => {

    for(const character of people) {
        test(`testId: 4. Data Driven Test using POM. Verify People Search results for search query: ${character.name}`, async({
            mainPage, peopleCard
        }) => {
            allure.feature('Main Test');
            allure.story('Data Driven Test using Page Object Model');
            allure.description('Verify People Search results for search query');
            allure.tag("main");
            allure.id("test-4");
            await test.step(`Fill search criteria: ${character.name}`, async() => {
                await mainPage.peopleRadio.click();
                await mainPage.searchInput.fill(character.name);
                await mainPage.searchBtn.click();
            })
            await test.step('Assert search results with expected', async() => {
                await expect.soft(await peopleCard.cardTitle.innerText(), `Verify Name: ${character.name}`).toEqual(character.name);
                await expect.soft(await peopleCard.characterBirthYear.innerText(), `Verify birth year: ${character.birthYear}`).toEqual(character.birthYear);
                await expect.soft(await peopleCard.characterGender.innerText(), `Verify gender: ${character.gender}`).toEqual(character.gender);
                await expect.soft(await peopleCard.characterEyeColor.innerText(), `Verify eye color: ${character.eyeColor}`).toEqual(character.eyeColor);
                await expect.soft(await peopleCard.characterSkinColor.innerText(), `Verify skin color: ${character.skinColor}`).toEqual(character.skinColor);
            })
        })
    }

    for(const planet of planets) {
        test(`testId: 5. Data Driven Test using POM and DTO models. Verify Planet Search results with the API response for query: ${planet.name}`, async({
            planetSteps
        }) => {
            allure.feature('Main Test');
            allure.story('Data Driven Test using Page Object Model and DTO model');
            allure.description('Verify People Search results for search query');
            allure.tag("main");
            allure.id("test-5");
            const expResults = await test.step(`Fill planet to Planet Search Query`, async() => {
                return await planetSteps.fillSearchQueryWithPlanet(planet.name);
            })
            const actResults = await test.step(`Collect search results`, async() => {
                return await planetSteps.collectUiResultsForPlanetSearch();
            })
            await test.step(`Compare actual and expected results`, async() => {
                await planetSteps.assertExpectedAndActualResult(expResults, actResults);
            })
        })
    }

    test(`testId: 6. Negative test. Verify that there is no results when Planet search query is invalid`, async({
        planetSteps
    }) => {
        allure.feature('Main Test');
        allure.story('Empty search results list for the invalid search');
        allure.description('Verify "Not found." search result for the invalid Planet search query');
        allure.tag("main");
        allure.id("test-6");
        await test.step(`Fill something into Planet Search Query`, async() => {
            await planetSteps.fillSearchQueryWithPlanet(testData.test6.query);
        })

        await test.step('Verify that there is no search results appears on the screen', async() => {
            await expect.soft(planetSteps.planetCard.planetCards, NO_CARD_MSG).not.toBeVisible();
            await expect.soft(planetSteps.page.locator(`text=${NOT_FOUND}`), NOT_FOUND_MSG)
                .toBeVisible();
        })
    })

    test(`testId: 7. Negative test. Verify that there is no results when People search query is invalid`, async({
        mainPage, peopleCard
    }) => {
        allure.feature('Main Test');
        allure.story('Empty search results list for the invalid search');
        allure.description(`Verify "${NOT_FOUND}" search result for the invalid People search query`);
        allure.tag("main");
        allure.id("test-7");
        await test.step(`Fill something into People Search Query and press Enter Key`, async() => {
            await mainPage.peopleRadio.click();
            await mainPage.searchInput.fill(testData.test7.query);
            await mainPage.page.keyboard.press('Enter');
            await mainPage.page.waitForLoadState('networkidle');
        })

        await test.step('Verify that there is no search results appears on the screen', async() => {
            await expect.soft(peopleCard.peopleCard, NO_CARD_MSG).not.toBeVisible();
            await expect.soft(mainPage.page.locator(`text=${NOT_FOUND}`), NOT_FOUND_MSG).toBeVisible();
        })
    })

    test.afterEach(async({page}) => {
        await page.close();
    })

})