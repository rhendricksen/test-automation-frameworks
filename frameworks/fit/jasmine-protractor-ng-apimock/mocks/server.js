const express = require('express');
const path = require('path');
const ngApimock = require('ng-apimock')();
const app = express();

const mocksOutputDirectory = path.resolve(`${__dirname}/../.tmp/ngApimock`);
const mocksSourceDirectory = path.resolve(`${__dirname}/endpoints`);
const assetsDirectory = path.resolve(`${__dirname}/assets`);

/**
 * Register all available mocks and generate interface
 */
ngApimock.run({
  src: mocksSourceDirectory,
  outputDir: mocksOutputDirectory,
  baseUrl: 'http://localhost:3000',
  done: function () {
  }
});

ngApimock.watch(mocksSourceDirectory);

app.set('port', (process.env.PORT || 3000));
// process the api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// serve the mocking interface for local development
app.use('/mocking', express.static(mocksOutputDirectory));
app.use('/assets', express.static(assetsDirectory));
app.use('/resize/assets', express.static(assetsDirectory));

app.listen(app.get('port'), function () {
  console.log('app running on port', app.get('port'));
});
