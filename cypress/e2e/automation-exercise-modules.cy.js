import {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiEfetuadoComSucesso,
  verificarSeMensagemDeCadastroExistenteFoiExibida,
} from '../modules/cadastro/cadastro.js';
import {
  acessarLogin,
  preencherLogin,
  verificarSeLoginFoiEfetuadoComSucesso,
  verificarSeMensagemDeErroFoiExibidaNoLogin
} from '../modules/login/login.js';
import {
  efetuarLogout,
  verificarSeOUsuarioFoiDeslogado
} from '../modules/logout/logout.js';
import {
  adicionarPrimeiroProdutoAoCarrinho,
  prosseguirParaCheckout,
  preencherPagamentoEConfirmarPedido,
  verificarSePedidoFoiConfirmado    
} from '../modules/pedido/checkout.js';
import { acessarProdutos, acessarEVerificarDetalhesDoPrimeiroProduto, pesquisarProduto, verificarResultadosDaPesquisa } from '../modules/produto/consulta.js';

describe('Automation Exercise', () => {
  let usuarioDeTeste
  let contaCriada

  beforeEach(() => {
    usuarioDeTeste = undefined
    contaCriada = false

    cy.visit('/')
  })

  afterEach(() => {
    if (!contaCriada || !usuarioDeTeste) return

    cy.visit('/')
    cy.get('body').then(($body) => {
      if (!$body.find('a[href="/logout"]').length) {
        cy.visit('/login')
        preencherLogin(usuarioDeTeste.email, usuarioDeTeste.password)
        cy.get('a[href="/logout"]').should('be.visible')
      }

      cy.get('a[href="/delete_account"]').click()
      cy.get('[data-qa="account-deleted"]')
        .should('be.visible')
        .and('contain.text', 'Account Deleted!')
      cy.get('[data-qa="continue-button"]').click()
    })
  })

  function criarUsuarioDeTeste() {
    const sufixo = `${Date.now()}${Cypress._.random(1000, 9999)}`
    usuarioDeTeste = {
      name: 'Pablo Smith',
      firstName: 'Pablo',
      lastName: 'Smith',
      email: `pablo.smith.${sufixo}@example.com`,
      password: 'Password123',
      birthDay: '1',
      birthMonth: 'September',
      birthYear: '1990',
      company: 'PGATS',
      address: 'Example Address',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipCode: '12345',
      mobileNumber: '999999999',
    }

    iniciarCadastro(usuarioDeTeste.name, usuarioDeTeste.email)
    preencherCadastro(usuarioDeTeste)

    return verificarSeCadastroFoiEfetuadoComSucesso().then(() => {
      contaCriada = true
      cy.get('[data-qa="continue-button"]').click()
    })
  }

  it('Caso de Teste 1: Cadastra um novo usuário com sucesso', () => {
    acessarLogin()
    criarUsuarioDeTeste()

    verificarSeLoginFoiEfetuadoComSucesso(usuarioDeTeste.name)
  })

  it('Caso de Teste 2: Login com email e senha válidos', () => {
    acessarLogin()
    criarUsuarioDeTeste()
    efetuarLogout()

    preencherLogin(usuarioDeTeste.email, usuarioDeTeste.password)

    verificarSeLoginFoiEfetuadoComSucesso(usuarioDeTeste.name)
  })

  it('Caso de Teste 3: Login com credenciais inválidas', () => {
    acessarLogin()
    preencherLogin('invalid@example.com', 'InvalidPassword123')

    verificarSeMensagemDeErroFoiExibidaNoLogin()
  })

  it('Caso de Teste 4: Logout com sucesso', () => {
    acessarLogin()
    criarUsuarioDeTeste()

    efetuarLogout()

    verificarSeOUsuarioFoiDeslogado()
  })

  it('Caso de Teste 5: Cadastro com email já existente', () => {
    acessarLogin()
    criarUsuarioDeTeste()
    efetuarLogout()

    acessarLogin()
    iniciarCadastro('Existing User', usuarioDeTeste.email)

    verificarSeMensagemDeCadastroExistenteFoiExibida()
  })

  it('Caso de Teste 8: Verificar os produtos e os detalhes de um produto', () => {
    acessarProdutos()

    acessarEVerificarDetalhesDoPrimeiroProduto()
  })

  it('Caso de Teste 9: Pesquisar por produto', () => {
    acessarProdutos()
    const produto = 'T-Shirt'
    pesquisarProduto(produto)

    verificarResultadosDaPesquisa(produto)
  })

  it('Caso de Teste 10: Verificar assinatura na página inicial', () => {
    const email = `assinatura.${Date.now()}@example.com`

    cy.get('footer').scrollIntoView()
    cy.get('footer h2').contains('Subscription').should('be.visible')
    cy.get('#susbscribe_email').should('be.visible').type(email)
    cy.get('#subscribe').click()
    cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!')
  })

  it('Caso de Teste 15: Fazer pedido registrando o usuário antes do checkout', () => {
    acessarLogin()
    criarUsuarioDeTeste()

    adicionarPrimeiroProdutoAoCarrinho()
    prosseguirParaCheckout()
    preencherPagamentoEConfirmarPedido(usuarioDeTeste.name, 'This is a test order.', '4111111111111111', '123', '05', '2025')
    verificarSePedidoFoiConfirmado()
  })

  it('Caso de Teste 16: Fazer pedido após login do usuário', () => {
    acessarLogin()
    criarUsuarioDeTeste()
    efetuarLogout()
    preencherLogin(usuarioDeTeste.email, usuarioDeTeste.password)
    verificarSeLoginFoiEfetuadoComSucesso(usuarioDeTeste.name)

    adicionarPrimeiroProdutoAoCarrinho()
    prosseguirParaCheckout()
    preencherPagamentoEConfirmarPedido(usuarioDeTeste.name, 'This is a test order.', '4111111111111111', '123', '05', '2025')
    verificarSePedidoFoiConfirmado()
  })
})