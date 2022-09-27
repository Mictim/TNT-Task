import { test, expect } from "../fixtures/Fixtures";
import { NO_CARD_MSG, NOT_FOUND, NOT_FOUND_MSG } from "../support/contants";
import { allure } from 'allure-playwright';
import * as testData from "../resources/testData.json";

test.describe.parallel(`Advanced Tasks`, async() => {

    test.beforeEach(async() => {
        allure.feature('Advanced Test');
    })

    // This sceanrio is failed due to issue in the logic of the application
    test.fixme(`testId: 1. Verify that empty result list will be visible after change search query`, async({
        mainPage, commonSteps, peopleCard
    }) => {
        allure.tag("advanced");
        allure.id("test-1");
        await test.step(`Fill the People search query with multiple search results`, async() => {
            await commonSteps.fillSearchCriteria(mainPage.peopleRadio, testData.test1.query);
            const cardsCount = await peopleCard.peopleCard.count();
            await expect.soft(cardsCount > 1, 'Verify count of search result records').toBeTruthy();
        })

        await test.step(`Clear Search query`, async() => {
            await mainPage.searchInput.dblclick();
            await mainPage.page.keyboard.press('Backspace');
            await mainPage.searchBtn.click();
        })

        await test.step('Verify that empty search list has been returned', async() => {
            await expect.soft(peopleCard.peopleCard, NO_CARD_MSG).not.toBeVisible();
            await expect.soft(mainPage.page.locator(`text=${NOT_FOUND}`), NOT_FOUND_MSG).toBeVisible();
        })
    })

    test(`testId: 2. Verify that empty search result list will be displayed after change search area for the same search query`,
        async({
            mainPage, planetSteps, peopleCard, planetCard
        }) => {
            allure.story(`Change search area with the same search query`);
            allure.tag("advanced");
            allure.id("test-2");
            await test.step(`Fill planet search field with planet full name`, async() => {
                await planetSteps.fillSearchQueryWithPlanet(testData.test2.query);
                await expect.soft(await planetCard.planetCards.count() > 0, 'There is a search result').toBeTruthy();
            })
            
            await test.step(`Switch to People search area and try to search people with the planet name`, async() => {
                await mainPage.peopleRadio.click();
                await mainPage.searchBtn.click();
            })

            await test.step(`Verify ${NOT_FOUND} message appears instead of search result list`, async() => {
                await expect.soft(peopleCard.peopleCard, NO_CARD_MSG).not.toBeVisible();
                await expect.soft(mainPage.page.locator(`text=${NOT_FOUND}`), NOT_FOUND_MSG).toBeVisible();
            })
        }
    )

    test(`testId: 3. Compare results on partial matching from the API response vs UI search results`, async({
        planetSteps
    }) => {
        allure.story(`Partial matching search query results comparison`);
        allure.tag("advanced");
        allure.id("test-3");
        const expectedResult = await test.step(`Search for the planet by partial matching search query`, async() => {
            return await planetSteps.fillSearchQueryWithPlanet(testData.test3.query);
        })

        const actualResult = await test.step(`Collect search results from UI`, async() => {
            return await planetSteps.collectUiResultsForPlanetSearch();
        })

        await test.step(`Compare results from the API response and UI search results`, async() => {
            await planetSteps.assertExpectedAndActualResult(expectedResult, actualResult);
        })
    })
})