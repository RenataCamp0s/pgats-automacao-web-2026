export function acessarLogin() {
  cy.get('a[href="/login"]').click()
}

export function preencherLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha)

  cy.get('[data-qa="login-button"]').click()
}

export function verificarSeLoginFoiEfetuadoComSucesso(name) {
  cy.get('.navbar-nav li')
    .contains(name)
    .should('be.visible')
}

export function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  cy.get('form[action*="login"] > p')
    .should('be.visible')
    .and('contain.text', 'Your email or password is incorrect!')
}
