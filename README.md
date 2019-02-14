# WIP - Awesome test automation frameworks
This repository contains multiple test frameworks for the integration and ui layer of the testing pyramid.
The service layer is split up into frontend integration tests and backend integration tests.
The UI layer consists of end to end testing and visual regression tests.
A list of different test automation frameworks covering different layers of the test pyramid.
Included in the repository is an example MEAN stack app, which is used to run the tests against.

## Test frameworks

### Frontend integration testframeworks (FIT)
- [Protractor/ng-apimock/jasmine](frameworks/fit/jasmine-protractor-ng-apimock/README.md)
- Webdriverio/mocking/mocha

### Backend integration testframeworks (BIT)
- Rest assured

### End to end testframeworks (E2E)
- Protractor/Cucumber
- Webdriver.io/Cucumber
- Cypress.io
- TestCafe

### Visual regression testframeworks
- [Protractor/Spectre](frameworks/visual-regression/jasmine-protractor-spectre/README.md)


## Example test app
Included in the repository is an example MEAN stack app. It is a simple app with a angular frontend, node.js backend which is used to test against.
It's included in the example-test-app folder.
