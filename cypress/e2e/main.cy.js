describe('e2e tests', () => {
  it('welcome page', () => {
    cy.intercept('GET', 'https://itemtree.localhost.pomerium.io/api/users/me', {
      fixture: 'users/me',
    }).as('getMe')
    cy.visit('/')
    cy.contains('Welcome to the items app')
  })
})
