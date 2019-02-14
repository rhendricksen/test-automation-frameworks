const HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  SELENIUM_PROMISE_MANAGER: false,
  allScriptsTimeout: 11000,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000
  },
  capabilities: {
    browserName: 'firefox',
    chromeOptions: {
      args: [
        'disable-infobars'
      ]
    },
    maxInstances: 2,
    shardTestFiles: false
  },
  directConnect: true,
  framework: 'jasmine2',
  suites: {
    all: '../specs/**/*.vt-spec.ts'
  },
  beforeLaunch: () => {
  },
  onPrepare: () => {
    require('ts-node').register({
      project: `${__dirname}/../tsconfig.json`
    });

    /* Set browserName on browser object */
    browser.getCapabilities().then(function (caps) {
      browser.browserName = caps.get('browserName').replace(/\s+/g, '');
    });

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
  }
};
