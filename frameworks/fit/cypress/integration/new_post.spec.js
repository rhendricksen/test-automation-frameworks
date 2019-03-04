/// <reference types="Cypress" />

context('New Post', () => {
  before(() => {
    cy.visit('http://localhost:4200/create')
  });

  it('Should have a title field', () => {
    cy.get('input').first()
      .type('my title').should('have.value', 'my title')

  });

  it('Should have a text area', () => {
    cy.get('textarea').first()
      .type('my message').should('have.value', 'my message')

  });
});
