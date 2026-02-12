import { LoginElements } from './LoginElements';

/**
 * Page Actions for Login Page
 * 
 * Encapsula todas as ações disponíveis na página de login do Sauce Labs
 * Métodos centralizados para garantir padronização
 * 
 * @class LoginActions
 */
export class LoginActions {
  constructor(private elements: LoginElements) {}

  /** Navega para a página de login (networkidle wait) */
  async gotoSwaglabs() {
    await this.elements.page.goto(this.elements.url, { waitUntil: 'networkidle' });
  }

  /** Valida elementos principais da página (título, campos, botão) */
  async formloginValidation() {
    await this.elements.tittle.isVisible({ timeout: 5000 });
    await this.elements.userNameInput.isVisible({ timeout: 5000 });
    await this.elements.passwordInput.isVisible({ timeout: 5000 });
    await this.elements.loginButton.isVisible({ timeout: 5000 });
  }

  /** @param {string} username - Nome de usuário */
  async fillUsername(username: string) {
    await this.elements.userNameInput.fill(username);
  }

  /** @param {string} password - Senha */
  async fillPassword(password: string) {
    await this.elements.passwordInput.fill(password);
  }

  /** Clica no botão de login */
  async clickLoginButton() {
    await this.elements.loginButton.click();
  }

  /**
   * Fluxo completo de login (preenche campos e clica)
   * 
   * @param {string} username - Nome de usuário
   * @param {string} password - Senha
   */
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Valida visibilidade de elemento específico (mapeamento português)
   * 
   * @param {string} elementName - Nome do elemento ('Logo Swag Labs', 'Campo Username', 'Campo Password', 'Botão Login', 'Mensagem de ajuda')
   */
  async validateElement(elementName: string) {
    let locator;

    switch (elementName) {
      case 'Logo Swag Labs':
        locator = this.elements.tittle;
        break;
      case 'Campo Username':
        locator = this.elements.userNameInput;
        break;
      case 'Campo Password':
        locator = this.elements.passwordInput;
        break;
      case 'Botão Login':
        locator = this.elements.loginButton;
        break;
      case 'Mensagem de ajuda':
        locator = this.elements.page.locator('.login_credentials_wrap');
        break;
      default:
        throw new Error(`Elemento "${elementName}" não mapeado`);
    }

    // Verificar se o elemento é visível
    const isVisible = await locator.isVisible();
    if (!isVisible) {
      throw new Error(`Elemento "${elementName}" não está visível`);
    }
  }
}
