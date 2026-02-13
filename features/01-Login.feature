# language: pt

@002-login
Funcionalidade: Login - Sauce Labs Demo

  @001-001 @login @validacao
  Cenario: Validar elementos da pagina de login
    Dado que estou na pagina de login do Sauce Labs
    Entao devo ver os seguintes elementos na pagina de login:
      | Logo Swag Labs |
      | Campo Username |
      | Campo Password |
      | Botao Login    |
      | Mensagem de ajuda |

  @001-002 @login @smoke @positivo
  Cenario: Realizar login com usuario padrao com sucesso
    Dado que estou na pagina de login do Sauce Labs
    Quando preencho o campo de usuario com "standard_user"
    E preencho o campo de senha com "secret_sauce"
    E clico no botao Login
    Entao devo estar logado com sucesso
    E devo ver a pagina de produtos

  @001-003 @login @negativo @regressao
  Cenario: Tentar login com senha incorreta
    Dado que estou na pagina de login do Sauce Labs
    Quando preencho o campo de usuario com "standard_user"
    E preencho o campo de senha com "senha_errada"
    E clico no botao Login
    Entao devo ver mensagem de erro de login
    
  @001-004 @login @negativo @regressao
  Cenario: Tentar login com usuario bloqueado
    Dado que estou na pagina de login do Sauce Labs
    Quando preencho o campo de usuario com "locked_out_user"
    E preencho o campo de senha com "secret_sauce"
    E clico no botao Login
    Entao devo ver mensagem de usuario bloqueado

  @001-005 @login @negativo @regressao
  Cenario: Fazer login sem preencher campos
    Dado que estou na pagina de login do Sauce Labs
    Quando clico no botao Login sem preencher campos
    Entao devo ver mensagem de erro obrigatorio
