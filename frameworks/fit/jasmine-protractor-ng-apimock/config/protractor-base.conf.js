const childProcess = require('child_process');
const path = require('path');
const HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  SELENIUM_PROMISE_MANAGER: false,
  allScriptsTimeout: 11000,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000
  },
  baseUrl: 'http://localhost:4200',
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
    tests: '../specs/**/*.it-spec.ts'
  },
  beforeLaunch: () => {
    /* clear reports folder */
    const rimraf = require('rimraf');
    rimraf('.reports/integration/', () => {
      console.log('Cleared it reports')
    });

    /* start ngApimock server serving the mocks */
    startNgApimockServer();
  },
  onPrepare: () => {
    require('ts-node').register({
      project: `${__dirname}/../tsconfig.tst.json`
    });

    /* Make ngApimock global */
    global.ngApimock = require('../.tmp/ngApimock/protractor.mock');

    /* Set browserName on browser object */
    browser.getCapabilities().then(function (caps) {
      browser.browserName = caps.get('browserName').replace(/\s+/g, '');
    });

    /* Add reporter to jasmine */
    const date = new Date();

    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: `.reports/integration/`,
      excludeSkippedSpecs: true,
      screenshotsSubfolder: 'screenshots',
      jsonsSubfolder: 'jsons',
      takeScreenShotsOnlyForFailedSpecs: true,
      docName: 'report.html',
      docTitle: 'FIT Report - ' + date,
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


    /* ensure ng mock api cookie gets loaded */
    return browser.get(browser.baseUrl);
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
