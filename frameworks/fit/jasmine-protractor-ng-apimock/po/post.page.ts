import { $, $$, browser, ElementFinder, ExpectedConditions } from 'protractor';

export class PostPage {

  rootEle: ElementFinder;

  constructor(postNr: number) {
    this.rootEle = $$('mat-expansion-panel-header').get(postNr - 1);
  }

  async getTitle(): Promise<string> {
    return await this.rootEle.$('span').getText();
  }

}
