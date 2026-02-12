import { Page, Locator } from '@playwright/test';

/**
 * Page Elements for Login Page
 * 
 * Centraliza todos os locators (seletores) da página de login do Sauce Labs
 * https://www.saucedemo.com/
 * 
 * **Observação:** Todas as propriedades desta classe são `readonly Locator` (exceto url que é `string`)
 * 
 * @class LoginElements
 * @param {Page} page - Instância da página Playwright
 * 
 * @example
 * const loginElements = new LoginElements(page);
 * await loginElements.userNameInput.fill('standard_user');
 * await loginElements.passwordInput.fill('secret_sauce');
 * await loginElements.loginButton.click();
 */
export class LoginElements {
  readonly page: Page;
  
  /** URL da página de login do Sauce Labs */
  readonly url: string = 'https://www.saucedemo.com/';

  /** Título "Swag Labs" - usado para validar se a página carregou */
  readonly tittle: Locator;

  /** Campo de entrada de username */
  readonly userNameInput: Locator;

  /** Campo de entrada de password */
  readonly passwordInput: Locator;

  /** Botão de login */
  readonly loginButton: Locator;

  /** Seção de nomes de usuário aceitos - informações sobre usuários disponíveis */
  readonly filterUsernames: Locator;

  constructor(page: Page) {
    this.page = page
    this.tittle = page.getByText('Swag Labs')
    this.userNameInput = page.locator('[data-test="username"]')
    this.passwordInput = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.filterUsernames = page.locator('div').filter({ hasText: 'Accepted usernames are:' }).nth(4)
  }
}
