[![CI](https://travis-ci.com/rhendricksen/test-automation-frameworks.svg?branch=master)](https://travis-ci.org/rhendricksen/test-automation-frameworks)
# WIP - A collection of test automation frameworks
This repository contains multiple test frameworks for the integration and ui layer of the testing pyramid.
The service layer is split up into frontend integration tests and backend integration tests.
The UI layer consists of end to end testing and visual regression tests.
A list of different test automation frameworks covering different layers of the test pyramid.
Included in the repository is an example test app, which is used to run the tests against.

## Test frameworks

### Frontend integration testframeworks (FIT)
- [Jasmine/Protractor/ng-apimock](frameworks/fit/jasmine-protractor-ng-apimock/README.md)
- Webdriverio/mocking/mocha
- [Cypress](frameworks/fit/cypress/README.md)

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
Included in the repository is an example MEAN stack app. It is a simple app with a angular frontend, node.js backend and in memory mongodb server which can be used as the application to test against.
It's included in the example-test-app folder.
