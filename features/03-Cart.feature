# language: pt
@003-cart @regressao
Funcionalidade: Carrinho de Compras
  Como um usuário autenticado do Sauce Labs
  Quero adicionar e remover produtos do carrinho
  Para gerenciar minha compra antes de finalizar

  Contexto:
    Dado que estou logado com o usuário "standard_user"

  @003-001 @smoke @positivo
  Cenário: Validar contador do badge do carrinho
    Dado que estou na página de produtos
    Quando adiciono o produto "Sauce Labs Backpack" ao carrinho
    Então o badge do carrinho deve mostrar "1"
    Quando adiciono o produto "Sauce Labs Bike Light" ao carrinho
    Então o badge do carrinho deve mostrar "2"
    Quando removo o produto "Sauce Labs Backpack" do carrinho
    Então o badge do carrinho deve mostrar "1"
    Quando removo o produto "Sauce Labs Bike Light" do carrinho
    Então o badge do carrinho não deve estar visível

  @003-002 @positivo
  Cenário: Navegar para o carrinho e continuar comprando
    Dado que estou na página de produtos
    Quando adiciono o produto "Sauce Labs Bolt T-Shirt" ao carrinho
    E clico no ícone do carrinho
    E devo estar na página do carrinho
    E o produto "Sauce Labs Bolt T-Shirt" deve estar no carrinho
    Quando removo o produto "Sauce Labs Bolt T-Shirt" do carrinho na página do carrinho
    E clico em Continue Shopping
    Então devo estar na página de produtos

  @003-003 @smoke @positivo @e2e
  Cenário: Completar fluxo de checkout com sucesso
    Dado que estou na página de produtos
    Quando adiciono o produto "Sauce Labs Fleece Jacket" ao carrinho
    E clico no ícone do carrinho
    E devo estar na página do carrinho
    E clico em Checkout
    E devo estar na página de informações do checkout
    E preencho as informações do checkout:
      | firstName | lastName  | postalCode |
      | John      | Doe       | 12345      |
    E clico em Continue na página de informações
    E devo estar na página de resumo do checkout
    E devo ver os elementos da página de resumo:
      | Payment Information    |
      | Shipping Information   |
      | Price Total           |
      | Tax                   |
      | Total                 |
    Quando clico em Finish
    Então devo ver a mensagem de sucesso "Thank you for your order!"
    E devo ver a mensagem de dispatch "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
