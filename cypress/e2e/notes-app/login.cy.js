/* eslint-disable no-undef */
context('Notes app', () => {

    beforeEach( () => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      
      cy.visit('http://localhost:3000/');
      
    });
  
    it('Display Login page by default', () => {
      
      // fill in the form
      cy.get('input[name="email"]').type('')
      cy.get('input[type="password"]').type('')
  
      // submit the form 
      cy.get('button').contains('Login').click()
      cy.contains('a', 'Logout').should('be.visible')
      cy.wait(5000)
      cy.get('a').contains('Logout').click()
      cy.contains('button', 'Login').should('be.visible')

    });

});