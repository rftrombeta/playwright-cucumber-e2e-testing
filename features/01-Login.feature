# language: pt

@002-login
Funcionalidade: Login - Sauce Labs Demo

  @001-001 @login @validacao
  Cenário: Validar elementos da página de login
    Dado que estou na página de login do Sauce Labs
    Então devo ver os seguintes elementos na página de login:
      | Logo Swag Labs |
      | Campo Username |
      | Campo Password |
      | Botão Login    |
      | Mensagem de ajuda |

  @001-002 @login @smoke @positivo
  Cenário: Realizar login com usuário padrão com sucesso
    Dado que estou na página de login do Sauce Labs
    Quando preencho o campo de usuário com "standard_user"
    E preencho o campo de senha com "secret_sauce"
    E clico no botão Login
    Então devo estar logado com sucesso
    E devo ver a página de produtos

  @001-003 @login @negativo @regressao
  Cenário: Tentar login com senha incorreta
    Dado que estou na página de login do Sauce Labs
    Quando preencho o campo de usuário com "standard_user"
    E preencho o campo de senha com "senha_errada"
    E clico no botão Login
    Então devo ver mensagem de erro de login
    
  @001-004 @login @negativo @regressao
  Cenário: Tentar login com usuário bloqueado
    Dado que estou na página de login do Sauce Labs
    Quando preencho o campo de usuário com "locked_out_user"
    E preencho o campo de senha com "secret_sauce"
    E clico no botão Login
    Então devo ver mensagem de usuário bloqueado

  @001-005 @login @negativo @regressao
  Cenário: Fazer login sem preencher campos
    Dado que estou na página de login do Sauce Labs
    Quando clico no botão Login sem preencher campos
    Então devo ver mensagem de erro obrigatório
