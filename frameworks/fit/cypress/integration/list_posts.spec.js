/// <reference types="Cypress" />

context('New Post', () => {
  before(() => {
    cy.server();
    cy.route('GET', 'api/posts*', 'fixture:posts.json');
    cy.visit('http://localhost:4200')
  });

  it('Should show all the posts', () => {
    cy.get('mat-expansion-panel').should('have.length', 2);

  });
});
