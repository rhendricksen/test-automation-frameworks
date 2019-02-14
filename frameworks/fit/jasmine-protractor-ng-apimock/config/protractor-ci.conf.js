// Protractor config for usage in continuous integration environment (Jenkins)
const config = require('./protractor-base.conf.js').config;
const extend = require('extend');

exports.config = extend({}, config, {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--disable-infobars']
    },
    maxInstances: 10,
    shardTestFiles: true
  }
});
