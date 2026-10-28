export function iniciarCadastro(nome, email) {
  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)

  cy.get('[data-qa="signup-button"]').click()
}

export function preencherCadastro(dados) {
  cy.get('#id_gender1').check()

  cy.get('[data-qa="password"]').type(dados.password)

  cy.get('[data-qa="days"]').select(dados.birthDay)
  cy.get('[data-qa="months"]').select(dados.birthMonth)
  cy.get('[data-qa="years"]').select(dados.birthYear)

  cy.get('#newsletter').check()
  cy.get('#optin').check()
  cy.get('[data-qa="first_name"]').type(dados.firstName)
  cy.get('[data-qa="last_name"]').type(dados.lastName)
  cy.get('[data-qa="company"]').type(dados.company)
  cy.get('[data-qa="address"]').type(dados.address)

  cy.get('[data-qa="country"]').select(dados.country)
  cy.get('[data-qa="state"]').type(dados.state)
  cy.get('[data-qa="city"]').type(dados.city)
  cy.get('[data-qa="zipcode"]').type(dados.zipCode)

  cy.get('[data-qa="mobile_number"]').type(dados.mobileNumber)

  cy.get('[data-qa="create-account"]').click()
}

export function verificarSeCadastroFoiEfetuadoComSucesso() {
  return cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain', 'Account Created!')
}

export function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  cy.get('form[action*="signup"] p')
    .should('be.visible')
    .and('contain.text', 'Email Address already exist!')
}

export function adicionarAssinaturaDeNewsletter(email) {
  cy.get('footer').scrollIntoView()
  cy.get('footer h2').contains('Subscription').should('be.visible')
  cy.get('#susbscribe_email').should('be.visible').type(email)
  cy.get('#subscribe').click()
}

export function verificarSeAssinaturaDeNewsletterFoiEfetuadaComSucesso() {
  cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!')
}