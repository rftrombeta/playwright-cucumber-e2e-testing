import { Page, Locator } from '@playwright/test';

/**
 * Page Elements for Products Page
 * 
 * Centraliza todos os locators (seletores) da página de produtos do Sauce Labs
 * https://www.saucedemo.com/
 * 
 * Contém locators para:
 * - Validação da página
 * - Lista de produtos
 * - Detalhes de produtos individuais
 * 
 * **Observação:** Todas as propriedades desta classe são `readonly Locator`
 * 
 * @class ProductsElements
 * @param {Page} page - Instância da página Playwright
 * 
 * @example
 * const productsElements = new ProductsElements(page);
 * await productsElements.tittle.isVisible();
 * await productsElements.inventoryItem.first().click();
 */
export class ProductsElements {
  readonly page: Page;

  // ==================== Validação da Página ====================
  
  /** Título "Products" */
  readonly tittle: Locator;

  // ==================== Lista de Produtos ====================
  
  /** Container da lista de produtos */
  readonly inventoryList: Locator;
  
  /** Item individual de produto (múltiplos) */
  readonly inventoryItem: Locator;
  
  /** Nome do produto */
  readonly inventoryItemName: Locator;
  
  /** Preço do produto */
  readonly inventoryItemPrice: Locator;
  
  /** Descrição do produto */
  readonly inventoryItemDesc: Locator;
  
  /** Imagem do produto */
  readonly inventoryItemImage: Locator;
  
  /** Botão "Add to cart" do produto */
  readonly inventoryItemAddButton: Locator;
  
  /** Link para detalhes do produto */
  readonly inventoryItemLink: Locator;

  // ==================== Página de Detalhes do Produto ====================
  
  /** Botão "Back to products" */
  readonly backToProductsButton: Locator;
  
  /** Nome do produto (página de detalhes) */
  readonly productDetailsName: Locator;
  
  /** Descrição do produto (página de detalhes) */
  readonly productDetailsDesc: Locator;
  
  /** Preço do produto (página de detalhes) */
  readonly productDetailsPrice: Locator;
  
  /** Imagem do produto (página de detalhes) */
  readonly productDetailsImage: Locator;
  
  /** Botão "Add to cart" (página de detalhes) */
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // ==================== Validação da Página ====================
    this.tittle = page.locator('[data-test="title"]').filter({ hasText: 'Products' });

    // ==================== Lista de Produtos ====================
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.inventoryItemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.inventoryItemImage = page.locator('[data-test="inventory-item-img"]');
    this.inventoryItemAddButton = page.locator('button[data-test*="add-to-cart"]');
    this.inventoryItemLink = page.locator('[data-test="inventory-item-name"]');

    // ==================== Página de Detalhes do Produto ====================
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.productDetailsName = page.locator('[data-test="inventory-item-name"]');
    this.productDetailsDesc = page.locator('[data-test="inventory-item-desc"]');
    this.productDetailsPrice = page.locator('[data-test="inventory-item-price"]');
    this.productDetailsImage = page.locator('[data-test="item-*-img"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
  }
}
