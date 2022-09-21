import {test, expect} from "../fixtures/Fixtures";
import { NO_CARD_MSG, NOT_FOUND, NOT_FOUND_MSG } from "../support/contants";

test.describe.parallel(`Advanced Tasks`, async() => {
    
    test.fixme(`Verify that empty result list will be visible after change search query`, async({
        mainPage, commonSteps, peopleCard
    }) => {
        await test.step(`Fill the People search query with multiple search results`, async() => {
            await commonSteps.fillSearchCriteria(mainPage.peopleRadio, 'Darth');
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

    test(`Verify that empty search result list will be displayed after change search area for the same searcfh query`,
        async({
            mainPage, planetSteps, peopleCard, planetCard
        }) => {
            await test.step(`Fill planet search field with planet full name`, async() => {
                await planetSteps.fillSearchQueryWithPlanet('Alderaan');
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

    test(`Compare results on partial matching from the API response vs UI search results`, async({
        planetSteps
    }) => {
        const expectedResult = await test.step(`Search for the planet by partial matching search query`, async() => {
            return await planetSteps.fillSearchQueryWithPlanet(`as`);
        })

        const actualResult = await test.step(`Collect search results from UI`, async() => {
            return await planetSteps.collectUiResultsForPlanetSearch();
        })

        await test.step(`Compare results from the API response and UI search results`, async() => {
            await planetSteps.assertExpectedAndActualResult(expectedResult, actualResult);
        })
    })
})