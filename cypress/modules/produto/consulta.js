export function acessarProdutos() {
    cy.get('a[href="/products"]').click()
    cy.get('.features_items').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
}

export function acessarEVerificarDetalhesDoPrimeiroProduto() {
    cy.get('.features_items .product-image-wrapper')
      .first()
      .find('a[href*="/product_details/"]')
      .click()
    cy.get('.product-information').should('be.visible')
    cy.get('.product-information h2').should('be.visible')
    cy.get('.product-information p').contains('Category:').should('be.visible')
    cy.get('.product-information span').contains('Rs.').should('be.visible')
    cy.get('.product-information p').contains('Availability:').should('be.visible')
    cy.get('.product-information p').contains('Condition:').should('be.visible')
    cy.get('.product-information p').contains('Brand:').should('be.visible')
}

export function pesquisarProduto(produto) {
    cy.get('input[name="search"]').type(produto)
    cy.get('#submit_search').click()
}

export function verificarResultadosDaPesquisa(produto) {
    cy.get('.features_items').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
    cy.get('.features_items .product-image-wrapper').each(($el) => {
        cy.wrap($el).find('.productinfo p').should('contain.text', produto)
    })
}