# language: pt

@002-produtos
Funcionalidade: Validação de Produtos - Sauce Labs
  Como um usuário da plataforma Sauce Labs
  Quero visualizar produtos disponíveis
  Para selecionar e validar as informações de cada produto

  Contexto:
    Dado que estou logado com o usuário "standard_user"
    E valido que a página de produtos carregou corretamente

  # ==================== Cenários de Validação da Página ====================

  @002-001 @validacao @smoke @positivo
  Cenário: Visualizar lista de produtos disponíveis
    Quando obtenho a lista de produtos
    Então devem existir 6 produtos na página
    E a lista deve conter os seguintes produtos:
      | Sauce Labs Backpack      |
      | Sauce Labs Bike Light    |
      | Sauce Labs Bolt T-Shirt  |
      | Sauce Labs Fleece Jacket |
      | Sauce Labs Onesie        |
      | Test.allTheThings() T-Shirt (Red) |

  # ==================== Cenários de Detalhes do Produto ====================

  @002-002 @detalhes-produto @regressao @positivo
  Cenário: Clicar em um produto e validar página de detalhes
    Quando clico no produto "Sauce Labs Backpack"
    Então valido que estou na página de detalhes do produto

  # ==================== Cenários de Navegação ====================

  @002-003 @navegacao @regressao @positivo
  Cenário: Voltar da página de detalhes para a lista de produtos
    Quando clico no produto "Sauce Labs Backpack"
    E valido que estou na página de detalhes do produto
    E clico no botão voltar
    Então devem existir 6 produtos na página

  @002-004 @navegacao @regressao @positivo
  Cenário: Navegar entre detalhes de múltiplos produtos
    Quando clico no produto "Sauce Labs Backpack"
    E clico no botão voltar
    E clico no produto "Sauce Labs Bike Light"
    E clico no botão voltar
    Então devem existir 6 produtos na página

  # ==================== Cenários de Validação de Preços ====================

  @002-005 @validar-precos @regressao @positivo
  Cenário: Validar preço do Backpack
    Quando clico no produto "Sauce Labs Backpack"
    Então o preço deve ser "$29.99"
