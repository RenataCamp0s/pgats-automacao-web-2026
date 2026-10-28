export function efetuarLogout() {
  cy.get('a[href="/logout"]')
    .should('be.visible')
    .click()
}

export function verificarSeOUsuarioFoiDeslogado() {
  cy.get('.login-form > h2').should('be.visible')
  cy.get('a[href="/logout"]').should('not.exist')
  cy.get('form[action*="login"]').should('be.visible')
  cy.url().should('include', 'login')
}