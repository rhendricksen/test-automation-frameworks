# Frontend integration tests
The frontend integration tests use ng-apimock to mock the backend.  
The test script will start the frontend, the mocking server, run the tests and close everything after.  
The frontend will run on port 9081, so it can run simultaneously with the non-mocked frontend.
The mocking server is hosted on port 3000.
Browser resolution is 1280x1024.

### Run tests
`yarn it`

### Mocks
Mocks are defined in the `mocks` folder. The folder structure resembles the endpoint path.
For example, GET endpoint using the following path:  
`/api/user/{user}`  
Will have the following folder structure:
```
.
└─ mocks
   ├─ data
   |  └─ user
   |     ├─  user-default.json
   |     └─   user-default.json
   └─ endpoints
      └─ user
         └─ GET-user.json 
```

### Test development

#### Linting
Run `yarn lint` or `ng lint it` to run tslint on the integration tests.  

#### Running
For test development you can use these commands:  
`yarn start -c it`  
Running the frontend on port 9081 and api calls routed to port 3000. Can run simultaneously with `yarn start`  

`yarn it -c dev`  
Run the tests in one browser which is visible. Good for debugging tests.  

`yarn it -c dev-low-res`  
Run the low res tests in one browser which is visible. Good for debugging tests.

`yarn start:it:mock`  
Run the mocking server on port 3000. Good for manual testing.

#### Run selection of tests locally
Select tests with `fdescribe`

Run `yarn it -c dev` 

Run `yarn start:it:mock`

Run `yarn stop:it:mock`
