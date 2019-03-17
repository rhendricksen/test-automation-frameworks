import { expect } from 'chai';
import * as typings from '../typings';

import { PostsOverviewPage } from '../po/posts-overview.page';

const postsOverviewPage = new PostsOverviewPage();

describe('List posts', () => {

  describe('Empty list of posts', () => {

    describe('When the initial page is opened', () => {
      beforeAll(async () => {

        await ngApimock.selectScenario('GET-posts', 'empty');
        await postsOverviewPage.open();
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
        await ngApimock.selectScenario('GET-posts', '2-items');
        await postsOverviewPage.open();

      });

      it('Then it should show the list of posts', async () => {
        expect(await postsOverviewPage.getPost(1).getTitle()).to.equal('My first post');

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
