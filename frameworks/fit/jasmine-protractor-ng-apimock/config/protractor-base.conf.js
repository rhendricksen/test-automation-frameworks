const childProcess = require('child_process');
const os = require('os');
const path = require('path');
const HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: "http://localhost:4200",
  allScriptsTimeout: 11000,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        'disable-infobars'
      ]
    },
    shardTestFiles: false
  },
  directConnect: true,
  framework: 'jasmine2',
  ngApimockOpts: {
    angularVersion: 6,
    hybrid: false
  },
  suites: {
    all: '../specs/**/*.it-spec.ts'
  },
  beforeLaunch: () => {
    /* start ngApimock server serving the mocks */
    startNgApimockServer();

    /* Chromedriver fix for osX */
    patchChromedriver();
  },
  onPrepare: () => {
    require('ts-node').register({
      project: `${__dirname}/../tsconfig.json`
    });

    /* Make ngApimock global */
    global.ngApimock = require('../.tmp/ngApimock/protractor.mock');

    /* Set browserName on browser object */
    browser.getCapabilities().then(function (caps) {
      browser.browserName = caps.get('browserName').replace(/\s+/g, '');
    });

    /* Patches for chrome on macOS */
    patchSchedule();

    /* Add reporter to jasmine */
    const date = new Date();

    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: `.reports/integration/${browser.params.resolutionName}`,
      excludeSkippedSpecs: true,
      screenshotsSubfolder: 'screenshots',
      jsonsSubfolder: 'jsons',
      takeScreenShotsOnlyForFailedSpecs: true,
      docName: 'report.html',
      docTitle: 'FE IT Report - ' + date,
      cssOverrideFile: `../../css/style.css`,
      //Sort test results by instanceId instead of timestamp, prevents ugly report order when sharding tests
      sortFunction: function sortFunction(a, b) {
        if (a.instanceId < b.instanceId) return -1;
        else if (a.instanceId > b.instanceId) return 1;

        if (a.timestamp < b.timestamp) return -1;
        else if (a.timestamp > b.timestamp) return 1;

        return 0;
      }
    }).getJasmine2Reporter());


    /* ensure ng mock api cookie loaded
       Why do we have to do this twice? */
    return browser.get(browser.baseUrl).then(() => browser.get(browser.baseUrl));
  }
};

function startNgApimockServer() {
  const server = childProcess.spawn('node', [path.resolve(`${__dirname}/../mocks/server.js`)], {
    cwd: path.resolve(`${__dirname}/..`)
  });

  server.stdout.on('data', function (data) {
    process.stdout.write('Ng-apimock: ' + data);
  });
  server.stderr.on('data', function (data) {
    process.stdout.write('Ng-apimock: ' + data);
  });

  // when finished, kill ng-apimock express server
  process.on('exit', () => {
    console.log('Ng-apimock closing');
    server.kill()
  });
}

/* Serialise all webdriver commands to prevent EPIPE errors (bug in webdriver)
   For more info about this see https://github.com/angular/protractor/issues/4294 */
function patchSchedule() {

  if (os.platform() === 'darwin') {
    let currentCommand = Promise.resolve();
    const webdriverSchedule = browser.driver.schedule;
    browser.driver.schedule = (command, description) => {
      return currentCommand.then(() =>
        webdriverSchedule.call(browser.driver, command, description)
      );
    };
  }
}

/* Until selenium 4 is used this will fix chrome on os x
   https://github.com/angular/protractor/issues/4294#issuecomment-408950204 */
function patchChromedriver() {

  if (os.platform() === 'darwin') {
    const fs = require('fs');
    const chromeFile = 'node_modules/selenium-webdriver/chrome.js';
    fs.readFile(chromeFile, 'utf8', function (err, data) {
      if (err)
        throw err;

      if (data.match(/new http.HttpClient\(url\)/g) !== null) {
        const result = data.replace(/new http.HttpClient\(url\)/g,
          "new http.HttpClient(url, new (require('http').Agent)({ keepAlive: true }))");
        console.log(`Patching ${chromeFile}`);
        fs.writeFileSync(chromeFile, result, 'utf8');
      }
    });
  }
}
