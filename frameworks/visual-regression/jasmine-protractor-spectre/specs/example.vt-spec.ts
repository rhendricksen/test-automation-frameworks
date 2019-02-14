import { expect } from 'chai';
import SpectreClient = require('nodeclient-spectre');
import { browser } from 'protractor';

const spectreUrl = 'http://localhost:3000';
const spectreClientInstance = new SpectreClient(spectreUrl);
let run;

describe('Example', () => {
  describe('Open google.com', () => {
    beforeAll(async () => {
      await browser.waitForAngularEnabled(false);
      await browser.get('https://google.com');
      run = await spectreClientInstance.createTestrun('Example', 'Google');

    });

    it('Then it should be the same', async () => {
      const screenshot = await browser.takeScreenshot();

      const result = await spectreClientInstance.submitScreenshot('Landingspage', browser.browserName, 1920, screenshot, run.id, '', '', '10');

      expect(result.pass).to.equal(true);
    });
  });
});
