Hello,

I'm sorry for the errors that you have experienced, I didn't have such issues on my local environment 
and GitHub Actions pipeline was executed without issues.

## Installation:

* ```npm ci``` or ```npm install``` - install the project
* ```npx playwright install``` - install Playwright browsers
* ```npm run playwright-test``` - playwright test execution

When you will try to execute it from the local, Playwright HTML report will be generated.

When the project will be run on CI/CD, [allure-playwright report](https://mictim.github.io/TNT-Task/) will be generated.

## Issues from the first try

### The first issue with project installing:
I found out that the issue with the installing the project by the command `npm ci` had the place.

For some reason `package-lock.json` file was not updated in the project.

I have updated it and it should work. If it will not work for you, please try to install the project with command:
`npm install`.

### The second issue was with test execution:
I tried to understand what is the issue and I find out that this issue reproduces when the internet connection is weak.

What was the previous configuration of the project:
* Test timeout - 30 seconds
* Action timeout and expect timeout - 5 seconds

I have increase timeouts:
* Test timeout - 120 seconds
* Action timeout - 30 seconds
* Expect timeout - 15 seconds
* Have added setup local server timeout for 120 seconds
* page.goto timeout is set up to 90 seconds.
* Also for local execution I've change retry count to 1.

The main problem of the test execution was starting webServer. Even if server will not up in 90 seconds and tests will fail, they will be re-run with the retry.

These changes were enough to execute tests on weak connection without timeout failures.

### Hardcoded input values:
I moved all test data to [testData.json](./e2e/resources/testData.json) file.

## Test coverage:
I have added test ids into the test names for the better navigation on the tests and map the ids with test data.

### [Advanced test scenarios](./e2e/tests/advanced.spec.ts):
* #1. This test should cover the scenario when user enters any valid query and get the search result and after that removes search query from the search input field and click on Search button.

`This test will be failed, because on the last search nothing will happen, no any request sent from the application (issue?).`
* #2. This test should cover the scenario when user tries to search planet by full name and get a valid search result and after that tries to find a character with the same name and get "Not Found." message.
* #3. This test is vice versa check for the test #2.
* #4. This test compare Planet partial search query UI results with the API response results.
* #5. This test compare People partial search query UI results with the API response results.

`In the last two test cases API response is stored as an attachment in the report`

### [Main test scenarios](./e2e/tests/starWars.spec.ts):
* #6. This is data driven test: I've get all character's props from the testData.json file and compare them with search results.
* #7. This is data driven test: I've get all planet's props from the testData.json file and compare them with search results.
* #8, #9. In these tests I'm verifying "Not Found." message appearance when query contains invalid search request.

`Also in these scenarios I've tried to use different queries with lowerCase, upperCase.
In scenario #9 I've used 'Enter' key press`

### [Simple test scenario](./e2e/tests/simpleTest.spec.ts):
* In this test I wanted to show how Playwright tests can be implemented without POM. This test checks all main elements on the Main page.

## Anomalies/Bugs
* When the Search input field is empty and user tries to click on Search Button (or press Enter key) no any request sent to the SWAPI service.
* When the user sent the search request the contains "space" (request -> https://swapi.dev/api/people/?search=%20), response contains all records from the SWAPI service.
* From my user experience, if search field is empty then "Search" button could be disabled, or when user submit the search request with the empty query all results can be displayed or Warning message should appear that search query is empty.

## What can be improved:
* Adding some tests for the input field validation like some vulnerable code snippets, sql queries etc.
* Adding some API tests, Playwright allows us to create apiContext and work with API requests/responses, mocking the data, etc.
* divide testData into simplier json data files with information for allure report (it can be implemented by creating some kind of allure props wrapper)


## First Try
=====================
Hello,

I want to highlight two things before you start:
1. As I discussed with my recrutement Lady I've decided to write test assessment with Playwright Automation Tool.
2. If this solution doesn't fit your expectations, please let me know and I'll re-write it on Cypress.

I would like to point out some interesting features regarding the solution:
1. Playwright latest version 1.26.0 (it was released yesterday).

2. I've added data attributes to the elements that I've been used in the project.

3. I was trying to show how playwright can be used with the different approach:

    A. Simple test with all selectors/assestions inside the test.

    B. I've added Page Object Model approach for the page element description and divide it on three "pages":
    -   Main Page with 4 controls: radio buttons, search input and search button.
    -   People Card with character name, gender, birth year, eye color, skin color.
    -   Planet Card with planet name, population, climate, gravity.

    C. I've added also API Response interception to get from the swapi service all needed information.

4. I've improved a bit playwright project with fixtures, where I can setup different parameters to use them directly in the tests. 

5. Also I've set up the playwright config file in the way of different usage on CI/CD environment and local env.

6. I've linked 4 different reporters: for the local usage "list" and "html", for CI/CD usage "allure" and "dot".

7. There is no need to start application before tests -> tests will start the application server before execution and kill after tests will completed. This was set up in playwright config file in section "webServer".

8. I have added Github Actions pipeline to deploy Allure Report on Github Pages: 
https://mictim.github.io/TNT-Task

How to start tests:

```npm run playwright-test```

How to run html-reporter:

```npm run html-report```

How to run allure-report:

```Change configuration```

```Execute command: npm run allure-report```


Thank you for your attention.
In case of any questions please contact me: 
email: mictim2002@gmail.com
