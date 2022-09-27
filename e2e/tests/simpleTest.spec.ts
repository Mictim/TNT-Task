import { test, expect } from "../fixtures/Fixtures";

import { allure } from "allure-playwright";

test(`Simple test. Verify starting page`, async({ page }) => {
    allure.feature('Simple test');
    allure.description('Verify starting page to contain all elements');
    allure.tag("simple");
    await expect.soft(page, 'Check the title').toHaveTitle('Star Wars Search Portal');
    await expect.soft(page.locator('data-test-id=search-btn'), 'Verify button Search is present on the screen').toBeVisible();
    await expect.soft(page.locator('data-test-id=people-radio'), 'Verify "People" radio button is present on the screen').toBeVisible();
    await expect.soft(page.locator('data-test-id=planet-radio'), 'Verify "Planet" radio button is present on the screen').toBeVisible();
    await expect.soft(page.locator('data-test-id=search-input'), 'Verify Seacrh Query input is Editable and is present on the screen').toBeEditable();
})