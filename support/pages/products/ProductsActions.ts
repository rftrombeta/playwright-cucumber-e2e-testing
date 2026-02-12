import { ProductsElements } from './ProductsElements';
import { expect } from '@playwright/test';

/**
 * Page Actions for Products Page
 * 
 * Encapsula todas as ações disponíveis na página de produtos do Sauce Labs
 * Métodos centralizados para garantir padronização
 * 
 * @class ProductsActions
 */
export class ProductsActions {
  constructor(private elements: ProductsElements) {}

  // ==================== Validação da Página ====================

  /** Valida elementos principais da página (título e lista) */
  async formProductsValidation(): Promise<void> {
    await expect(this.elements.tittle).toBeVisible({ timeout: 5000 });
    await expect(this.elements.inventoryList).toBeVisible({ timeout: 5000 });
  }

  /**
   * @deprecated Use productsValidation() instead
   * Mantido para compatibilidade retroativa
   */
  async homeValidation(): Promise<void> {
    await this.formProductsValidation();
  }

  /** Valida elementos da página de detalhes do produto */
  async productDetailsValidationPage(): Promise<void> {
    await expect(this.elements.backToProductsButton).toBeVisible({ timeout: 5000 });
    await expect(this.elements.productDetailsName).toBeVisible({ timeout: 5000 });
    await expect(this.elements.productDetailsDesc).toBeVisible({ timeout: 5000 });
    await expect(this.elements.productDetailsPrice).toBeVisible({ timeout: 5000 });
    await expect(this.elements.addToCartButton).toBeVisible({ timeout: 5000 });
  }

  // ==================== Listar Produtos ====================

  /** @returns {Promise<string[]>} Lista com nomes dos produtos visíveis */
  async listProducts(): Promise<string[]> {
    const productCount = await this.elements.inventoryItem.count();
    const products: string[] = [];

    for (let i = 0; i < productCount; i++) {
      const name = await this.elements.inventoryItemName.nth(i).textContent();
      if (name) {
        products.push(name.trim());
      }
    }

    return products;
  }

  /** @returns {Promise<number>} Quantidade total de produtos */
  async getProductCount(): Promise<number> {
    return await this.elements.inventoryItem.count();
  }

  /**
   * @param {string} productName - Nome do produto
   * @returns {Promise<boolean>} true se o produto existe
   */
  async productExists(productName: string): Promise<boolean> {
    const products = await this.listProducts();
    return products.some(p => p.toLowerCase().includes(productName.toLowerCase()));
  }

  // ==================== Clicar em Produtos ====================

  /**
   * Clica em um produto específico pelo nome (abre detalhes)
   * 
   * @param {string} productName - Nome do produto a clicar
   */
  async clickProduct(productName: string): Promise<void> {
    const productLocator = this.elements.inventoryItemName.filter({ hasText: productName }).first();
    await expect(productLocator).toBeVisible({ timeout: 5000 });
    await productLocator.click();
  }

  /**
   * Clica em um produto pelo índice (0-based)
   * 
   * @param {number} index - Índice do produto
   */
  async clickProductByIndex(index: number): Promise<void> {
    const product = this.elements.inventoryItem.nth(index);
    await expect(product).toBeVisible({ timeout: 5000 });
    await product.click();
  }

  /**
   * Clica no nome/link do produto (abre detalhes)
   * 
   * @param {string} productName - Nome do produto
   */
  async clickProductLink(productName: string): Promise<void> {
    const productLink = this.elements.inventoryItemLink.filter({ hasText: productName });
    await expect(productLink).toBeVisible({ timeout: 5000 });
    await productLink.click();
  }

  // ==================== Informações do Produto (Lista) ====================

  /**
   * @param {string} productName - Nome do produto
   * @returns {Promise<{ name: string; price: string; description: string }>} Info do produto
   */
  async getProductInfo(productName: string): Promise<{ name: string; price: string; description: string }> {
    const productItem = this.elements.inventoryItem.filter({ hasText: productName }).first();
    await expect(productItem).toBeVisible({ timeout: 5000 });

    const name = await productItem.locator('[data-test="inventory-item-name"]').textContent();
    const price = await productItem.locator('[data-test="inventory-item-price"]').textContent();
    const description = await productItem.locator('[data-test="inventory-item-desc"]').textContent();

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      description: description?.trim() || ''
    };
  }

  /**
   * @param {string} productName - Nome do produto
   * @returns {Promise<string>} Preço do produto (ex: '$29.99')
   */
  async getProductPrice(productName: string): Promise<string> {
    const price = await this.elements.inventoryItem
      .filter({ hasText: productName })
      .first()
      .locator('[data-test="inventory-item-price"]')
      .textContent();

    return price?.trim() || '';
  }

  /**
   * @param {string} productName - Nome do produto
   * @returns {Promise<string>} Descrição do produto
   */
  async getProductDescription(productName: string): Promise<string> {
    const desc = await this.elements.inventoryItem
      .filter({ hasText: productName })
      .first()
      .locator('[data-test="inventory-item-desc"]')
      .textContent();

    return desc?.trim() || '';
  }

  // ==================== Informações do Produto (Detalhes) ====================

  /** @returns {Promise<{ name: string; price: string; description: string }>} Detalhes do produto */
  async getProductDetails(): Promise<{ name: string; price: string; description: string }> {
    await this.productDetailsValidationPage();

    const name = await this.elements.productDetailsName.textContent();
    const price = await this.elements.productDetailsPrice.textContent();
    const description = await this.elements.productDetailsDesc.textContent();

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      description: description?.trim() || ''
    };
  }

  /** @param {string} expectedName - Nome esperado */
  async validateProductName(expectedName: string): Promise<void> {
    const name = await this.elements.productDetailsName.textContent();
    await expect(name?.trim()).toBe(expectedName);
  }

  /** @param {string} expectedPrice - Preço esperado (ex: '$29.99') */
  async validateProductPrice(expectedPrice: string): Promise<void> {
    const price = await this.elements.productDetailsPrice.textContent();
    await expect(price?.trim()).toBe(expectedPrice);
  }

  /** Valida se a descrição está visível (não vazia) */
  async validateProductHasDescription(): Promise<void> {
    const desc = await this.elements.productDetailsDesc.textContent();
    await expect(desc?.trim().length).toBeGreaterThan(0);
  }

  // ==================== Navegação ====================

  /** Clica no botão voltar para retornar à página de produtos */
  async clickBackButton(): Promise<void> {
    await expect(this.elements.backToProductsButton).toBeVisible({ timeout: 5000 });
    await this.elements.backToProductsButton.click();
  }

  /** Valida se voltou para a página de produtos */
  async validateBackToProducts(): Promise<void> {
    await this.formProductsValidation();
  }
}
