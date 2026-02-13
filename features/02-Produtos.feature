# language: pt

@002-produtos
Funcionalidade: Validacao de Produtos - Sauce Labs
  Como um usuario da plataforma Sauce Labs
  Quero visualizar produtos disponiveis
  Para selecionar e validar as informacoes de cada produto

  Contexto:
    Dado que estou logado com o usuario "standard_user"
    E valido que a pagina de produtos carregou corretamente

  # ==================== Cenarios de Validacao da Pagina ====================

  @002-001 @validacao @smoke @positivo
  Cenario: Visualizar lista de produtos disponiveis
    Quando obtenho a lista de produtos
    Entao devem existir 6 produtos na pagina
    E a lista deve conter os seguintes produtos:
      | Sauce Labs Backpack      |
      | Sauce Labs Bike Light    |
      | Sauce Labs Bolt T-Shirt  |
      | Sauce Labs Fleece Jacket |
      | Sauce Labs Onesie        |
      | Test.allTheThings() T-Shirt (Red) |

  # ==================== Cenarios de Detalhes do Produto ====================

  @002-002 @detalhes-produto @regressao @positivo
  Cenario: Clicar em um produto e validar pagina de detalhes
    Quando clico no produto "Sauce Labs Backpack"
    Entao valido que estou na pagina de detalhes do produto

  # ==================== Cenarios de Navegacao ====================

  @002-003 @navegacao @regressao @positivo
  Cenario: Voltar da pagina de detalhes para a lista de produtos
    Quando clico no produto "Sauce Labs Backpack"
    E valido que estou na pagina de detalhes do produto
    E clico no botao voltar
    Entao devem existir 6 produtos na pagina

  @002-004 @navegacao @regressao @positivo
  Cenario: Navegar entre detalhes de multiplos produtos
    Quando clico no produto "Sauce Labs Backpack"
    E clico no botao voltar
    E clico no produto "Sauce Labs Bike Light"
    E clico no botao voltar
    Entao devem existir 6 produtos na pagina

  # ==================== Cenarios de Validacao de Precos ====================

  @002-005 @validar-precos @regressao @positivo
  Cenario: Validar preco do Backpack
    Quando clico no produto "Sauce Labs Backpack"
    Entao o preco deve ser "$29.99"
