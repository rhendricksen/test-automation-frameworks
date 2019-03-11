import { $, browser, ElementFinder, ExpectedConditions } from 'protractor';

import { PostPage } from './post.page';

export class PostsOverviewPage {

  infoText: ElementFinder = $('.info-text ');
  newPostBtn: ElementFinder = $('[data-test="new-post-btn"]');

  async open(): Promise<void> {
    await browser.get('/');
  }

  async getInfoText(): Promise<string> {
    return this.infoText.getText();
  }

  async isNewPostBtnVisible(): Promise<boolean> {
    return await ExpectedConditions.visibilityOf(this.newPostBtn)();
  }

  getPost(postNr: number): PostPage {
    return new PostPage(postNr);
  }

}
