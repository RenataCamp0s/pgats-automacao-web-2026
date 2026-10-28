export function adicionarPrimeiroProdutoAoCarrinho() {
    cy.get('a[href="/products"]').click()
    cy.get('.features_items').should('be.visible')
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0)
      .first()
      .within(() => {
        cy.get('a[href*="/product_details/"]').click()
      })

    cy.get('.product-information').should('be.visible')
    cy.get('button[class*="cart"]').should('be.visible').click()
    cy.get('.modal-content').should('be.visible')
    cy.get('.modal-content a[href="/view_cart"]').click()
    cy.get('.cart_info').should('be.visible')
}

export function prosseguirParaCheckout() {
    cy.contains('#do_action a', 'Proceed To Checkout').click()
    cy.url().should('include', '/checkout')
    cy.get('.checkout-information').should('be.visible')
}

export function preencherPagamentoEConfirmarPedido(name, textoMensagem, cartao, cvc, mes, ano) {
    cy.get('textarea[name="message"]').type(textoMensagem)
    cy.get('a[href="/payment"]').click()
    cy.get('input[name="name_on_card"]').type(name)
    cy.get('input[name="card_number"]').type(cartao)
    cy.get('input[name="cvc"]').type(cvc)
    cy.get('input[name="expiry_month"]').type(mes)
    cy.get('input[name="expiry_year"]').type(ano)
    cy.get('#submit').click()
}

export function verificarSePedidoFoiConfirmado() {
    cy.contains('p', 'Congratulations! Your order has been confirmed!')
      .should('be.visible')
}
