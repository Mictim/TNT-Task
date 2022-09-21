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

`How to start tests:`

```npm run playwright-test```

`How to run html-reporter:`

```npm run html-report```

`How to run allure-report`

```Change configuration```

```Execute command: npm run allure-report```


Thank you for your attention.
In case of any questions please contact me: 
email: mictim2002@gmail.com
