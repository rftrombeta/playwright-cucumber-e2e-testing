# language: pt
@003-cart @regressao
Funcionalidade: Carrinho de Compras
  Como um usuario autenticado do Sauce Labs
  Quero adicionar e remover produtos do carrinho
  Para gerenciar minha compra antes de finalizar

  Contexto:
    Dado que estou logado com o usuario "standard_user"

  @003-001 @smoke @positivo
  Cenario: Validar contador do badge do carrinho
    Dado que estou na pagina de produtos
    Quando adiciono o produto "Sauce Labs Backpack" ao carrinho
    Então o badge do carrinho deve mostrar "1"
    Quando adiciono o produto "Sauce Labs Bike Light" ao carrinho
    Então o badge do carrinho deve mostrar "2"
    Quando removo o produto "Sauce Labs Backpack" do carrinho
    Então o badge do carrinho deve mostrar "1"
    Quando removo o produto "Sauce Labs Bike Light" do carrinho
    Entao o badge do carrinho nao deve estar visivel

  @003-002 @positivo
  Cenario: Navegar para o carrinho e continuar comprando
    Dado que estou na pagina de produtos
    Quando adiciono o produto "Sauce Labs Bolt T-Shirt" ao carrinho
    E clico no icone do carrinho
    E devo estar na pagina do carrinho
    E o produto "Sauce Labs Bolt T-Shirt" deve estar no carrinho
    Quando removo o produto "Sauce Labs Bolt T-Shirt" do carrinho na pagina do carrinho
    E clico em Continue Shopping
    Entao devo estar na pagina de produtos

  @003-003 @smoke @positivo @e2e
  Cenario: Completar fluxo de checkout com sucesso
    Dado que estou na pagina de produtos
    Quando adiciono o produto "Sauce Labs Fleece Jacket" ao carrinho
    E clico no icone do carrinho
    E devo estar na pagina do carrinho
    E clico em Checkout
    E devo estar na pagina de informacoes do checkout
    E preencho as informacoes do checkout:
      | firstName | lastName  | postalCode |
      | John      | Doe       | 12345      |
    E clico em Continue na pagina de informacoes
    E devo estar na pagina de resumo do checkout
    E devo ver os elementos da pagina de resumo:
      | Payment Information    |
      | Shipping Information   |
      | Price Total           |
      | Tax                   |
      | Total                 |
    Quando clico em Finish
    Entao devo ver a mensagem de sucesso "Thank you for your order!"
    E devo ver a mensagem de dispatch "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
