import { CartElements } from './CartElements';
import { expect } from '@playwright/test';

/**
 * Page Actions for Cart and Checkout Pages
 * 
 * Encapsula todas as ações disponíveis para carrinho e checkout do Sauce Labs
 * Métodos centralizados para garantir padronização
 * 
 * @class CartActions
 */
export class CartActions {
  constructor(private elements: CartElements) {}

  // ==================== Badge do Carrinho ====================

  /** @returns {Promise<number>} Contagem do badge (0 se não visível) */
  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.elements.cartBadge.isVisible().catch(() => false);
    
    if (!isVisible) {
      return 0;
    }
    
    const text = await this.elements.cartBadge.textContent();
    return parseInt(text || '0', 10);
  }

  /** @param {number} expectedCount - Contagem esperada */
  async validateCartBadgeCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartBadgeCount();
    expect(actualCount).toBe(expectedCount);
  }

  /** Valida que o badge do carrinho não está visível (carrinho vazio) */
  async validateCartBadgeNotVisible(): Promise<void> {
    const isVisible = await this.elements.cartBadge.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  }

  /** Clica no ícone do carrinho */
  async clickCartIcon(): Promise<void> {
    await this.elements.cartLink.click();
  }

  // ==================== Adicionar/Remover Produtos ====================

  /** @param {string} productName - Nome do produto */
  async addProductToCart(productName: string): Promise<void> {
    const addButton = this.elements.getAddToCartButton(productName);
    await expect(addButton).toBeVisible({ timeout: 5000 });
    await addButton.click();
  }

  /** @param {string} productName - Nome do produto (página de produtos) */
  async removeProductFromInventory(productName: string): Promise<void> {
    const removeButton = this.elements.getRemoveButtonFromInventory(productName);
    await expect(removeButton).toBeVisible({ timeout: 5000 });
    await removeButton.click();
  }

  // ==================== Página do Carrinho ====================

  /** Valida que está na página do carrinho */
  async validateCartPage(): Promise<void> {
    await expect(this.elements.cartTitle).toBeVisible({ timeout: 5000 });
  }

  /** @returns {Promise<number>} Quantidade de itens no carrinho */
  async getCartItemsCount(): Promise<number> {
    return await this.elements.cartItem.count();
  }

  /** @param {string} productName - Nome do produto (página do carrinho) */
  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.elements.getRemoveButtonFromCart(productName);
    await expect(removeButton).toBeVisible({ timeout: 5000 });
    await removeButton.click();
  }

  /** Clica no botão "Continue Shopping" */
  async clickContinueShopping(): Promise<void> {
    await this.elements.continueShoppingButton.click();
  }

  /** Clica no botão "Checkout" */
  async clickCheckout(): Promise<void> {
    await this.elements.checkoutButton.click();
  }

  /**
   * @param {string} productName - Nome do produto
   * @returns {Promise<boolean>} true se produto está no carrinho
   */
  async isProductInCart(productName: string): Promise<boolean> {
    // Buscar item do carrinho que contém o nome do produto
    const itemNameLocator = this.elements.cartItemName.filter({ hasText: productName });
    const count = await itemNameLocator.count();
    return count > 0;
  }

  // ==================== Checkout - Informações ====================

  /** Valida que está na página de informações do checkout */
  async validateCheckoutInfoPage(): Promise<void> {
    await expect(this.elements.checkoutInfoTitle).toBeVisible({ timeout: 5000 });
  }

  /**
   * Preenche as informações do checkout
   * 
   * @param {string} firstName - Primeiro nome
   * @param {string} lastName - Sobrenome
   * @param {string} postalCode - CEP/Código postal
   */
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.elements.firstNameInput.fill(firstName);
    await this.elements.lastNameInput.fill(lastName);
    await this.elements.postalCodeInput.fill(postalCode);
  }

  /** Clica no botão "Continue" na página de informações */
  async clickContinueCheckout(): Promise<void> {
    await this.elements.continueButton.click();
  }

  /**
   * Fluxo completo: preencher informações e continuar
   * 
   * @param {string} firstName - Primeiro nome
   * @param {string} lastName - Sobrenome
   * @param {string} postalCode - CEP/Código postal
   */
  async completeCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.clickContinueCheckout();
  }

  // ==================== Checkout Overview ====================

  /** Valida que está na página de overview do checkout */
  async validateCheckoutOverviewPage(): Promise<void> {
    await expect(this.elements.checkoutOverviewTitle).toBeVisible({ timeout: 5000 });
  }

  /** Valida elementos essenciais da página de overview */
  async validateCheckoutOverviewElements(): Promise<void> {
    await expect(this.elements.paymentInformation).toBeVisible({ timeout: 5000 });
    await expect(this.elements.shippingInformation).toBeVisible({ timeout: 5000 });
    await expect(this.elements.itemTotal).toBeVisible({ timeout: 5000 });
    await expect(this.elements.tax).toBeVisible({ timeout: 5000 });
    await expect(this.elements.total).toBeVisible({ timeout: 5000 });
    await expect(this.elements.finishButton).toBeVisible({ timeout: 5000 });
  }

  /** @returns {Promise<string>} Valor total (ex: "$32.39") */
  async getTotalPrice(): Promise<string> {
    const totalText = await this.elements.total.textContent();
    return totalText?.replace('Total: ', '').trim() || '';
  }

  /** Clica no botão "Finish" */
  async clickFinish(): Promise<void> {
    await this.elements.finishButton.click();
  }

  // ==================== Checkout Complete ====================

  /** Valida que está na página de conclusão do checkout */
  async validateCheckoutCompletePage(): Promise<void> {
    await expect(this.elements.checkoutCompleteTitle).toBeVisible({ timeout: 5000 });
  }

  /** Valida a mensagem de sucesso "Thank you for your order!" */
  async validateThankYouMessage(): Promise<void> {
    await expect(this.elements.completeHeader).toBeVisible({ timeout: 5000 });
    const headerText = await this.elements.completeHeader.textContent();
    expect(headerText).toContain('Thank you for your order!');
  }

  /**
   * Valida a mensagem de dispatch
   * 
   * @param {string} expectedText - Texto esperado (padrão: texto completo do pony)
   */
  async validateDispatchMessage(
    expectedText: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  ): Promise<void> {
    await expect(this.elements.completeText).toBeVisible({ timeout: 5000 });
    const text = await this.elements.completeText.textContent();
    expect(text).toContain(expectedText);
  }

  /** Valida mensagens de conclusão completas */
  async validateOrderComplete(): Promise<void> {
    await this.validateCheckoutCompletePage();
    await this.validateThankYouMessage();
    await this.validateDispatchMessage();
  }

  /** Clica no botão "Back Home" */
  async clickBackHome(): Promise<void> {
    await this.elements.backHomeButton.click();
  }

  // ==================== Fluxos Completos ====================

  /**
   * Fluxo completo: Add produto → Validar badge
   * 
   * @param {string} productName - Nome do produto
   * @param {number} expectedCount - Contagem esperada após adicionar
   */
  async addProductAndValidateBadge(
    productName: string,
    expectedCount: number
  ): Promise<void> {
    await this.addProductToCart(productName);
    await this.validateCartBadgeCount(expectedCount);
  }

  /**
   * Fluxo completo de checkout com validação
   * 
   * @param {Object} info - Informações do cliente
   */
  async completeFullCheckout(info: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }): Promise<void> {
    await this.clickCheckout();
    await this.validateCheckoutInfoPage();
    await this.completeCheckoutInformation(info.firstName, info.lastName, info.postalCode);
    await this.validateCheckoutOverviewPage();
    await this.validateCheckoutOverviewElements();
    await this.clickFinish();
    await this.validateOrderComplete();
  }
}
