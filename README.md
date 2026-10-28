# Trabalho Final da Disciplina de Automação de Testes Web

Projeto de automação de testes web com Cypress no site [Automation Exercise](https://automationexercise.com/). Os cenários selecionados validam funcionalidades de cadastro, autenticação, consulta de produtos, newsletter e compra:

- **Cadastro de usuário:** verifica a criação de uma nova conta.
- **Login válido:** confirma o acesso com credenciais corretas.
- **Login inválido:** valida a mensagem exibida para credenciais incorretas.
- **Logout:** verifica o encerramento da sessão.
- **Cadastro com e-mail existente:** confirma a rejeição de um e-mail já cadastrado.
- **Detalhes de produto:** valida as informações apresentadas na página de um produto.
- **Pesquisa de produto:** verifica se os resultados correspondem ao termo pesquisado.
- **Assinatura da newsletter:** valida a confirmação de inscrição.
- **Pedido com cadastro prévio:** percorre o carrinho, checkout e confirmação do pedido.
- **Pedido após login:** valida o fluxo de compra para um usuário autenticado.

Os testes end-to-end estão em `cypress/e2e/` e usam módulos reutilizáveis em `cypress/modules/`.
