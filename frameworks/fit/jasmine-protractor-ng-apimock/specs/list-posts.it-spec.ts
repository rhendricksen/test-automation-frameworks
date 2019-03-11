import { expect } from 'chai';
import { browser } from 'protractor';

import { PostsOverviewPage } from '../po/posts-overview.page';
import * as typings from '../types';

const postsOverviewPage = new PostsOverviewPage();

fdescribe('List posts', () => {

  fdescribe('Empty list of posts', () => {

    describe('When the initial page is opened', () => {
      beforeAll(async () => {

        await browser

        await ngApimock.selectScenario('GET-posts', 'empty');
        await postsOverviewPage.open();
        await browser.sleep(10000000);

      });

      it('Then it shows an empty list', async () => {
        expect(await postsOverviewPage.getInfoText()).to.equal('No posts added yet!');

      });

      it('Then it should show the new post button', async () => {

        expect(await postsOverviewPage.isNewPostBtnVisible()).to.equal(true);

      });
    });
  });

  describe('Show a list of posts', () => {

    describe('When the initial page is opened', () => {
      beforeAll(async () => {
        await ngApimock.selectScenario('GET-posts', 'test');
        await postsOverviewPage.open();

      });

      it('Then it should show the list of posts', async () => {
        expect(await postsOverviewPage.getPost(1).getTitle()).to.equal('hello world');

      });

      it('Then it should show the new post button', async () => {
        expect(await postsOverviewPage.isNewPostBtnVisible()).to.equal(true);
      });
    });

    describe('When a post is clicked', () => {
      beforeAll(async () => {

      });

      it('Then the contents of the post is shown', async () => {

      });

      it('Then the edit button is shown', async () => {

      });

      it('Then the delete button is shown', async () => {

      });

    });

    describe('When an open post is clicked', () => {
      beforeAll(async () => {

      });

      it('Then the post will collapse again', async () => {

      });

      it('Then the content of the post is no longer shown', async () => {

      });

      it('Then the edit button is no longer shown', async () => {

      });

      it('Then the delete button is no longer shown', async () => {

      });

    });
  });

});
