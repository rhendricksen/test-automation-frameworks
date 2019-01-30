## Way of working
#### Separation of business logic and technical implementation
We use page objects to separate business logic from the technical implementation.
In practice this means that the *.spec files don't have any knowledge of the technical implementation of the webpage.
Don't use selectors/DOM elements($, $$) in these files, but depend on the page object to get this information. The page objects are the link to the DOM and define all the selectors we need.
The spec files define the test, so there is where the assertions are done, not in the page objects.

#### Optimal code reuse
Since both the Frontend integration tests and the E2E test interact with the the DOM we can reuse the pageobjects between the tests. Make sure the pageobjects are general enough that they can be used in both tests.
For example, don't create hard dependencies on ng-apimock for certain pageobject interactions, which would result that it cannot be used for E2E.

#### Dealing with asynchronous
Javascript executes code asynchronous and all interactions with the browser return promises, we need to handle those promises to make sure our tests run in the order we want.
Since the promise manager from selenium is deprecated and will be removed in v4, we cannot rely on this mechanism.
To make sure all the code is executed in the order we want, we use the async/await method. Read up on it here:
https://github.com/angular/protractor/blob/master/docs/async-await.md

#### Setup for change
Since the application will change, selectors will change too. Make sure the selectors for a page are defined in its class fields instead of seperate
 methods where it can be hard to find them.
