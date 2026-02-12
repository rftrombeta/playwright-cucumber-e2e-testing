/**
 * Barrel export for Products page
 * Exporta APENAS ProductsActions para forçar uso de ações centralizadas
 * 
 * ⚠️ ProductsElements NÃO é exportado para evitar uso direto dos locators
 * Isso garante padronização: todas as interações devem passar por Actions
 * 
 * @module support/pages/products
 * 
 * @example
 * import { createProductsPage } from './products';
 * 
 * const products = createProductsPage(page);
 * await products.productsValidation();  // ✅ Correto: usa Actions
 * 
 * // ❌ Errado: não consegue acessar elements diretamente
 * // products.elements.inventoryItem.click();
 */
export { ProductsActions } from './ProductsActions';
// ProductsElements não é exportado intencionalmente

import { Page } from '@playwright/test';
import { ProductsElements } from './ProductsElements';
import { ProductsActions } from './ProductsActions';

/**
 * Factory function para criar instância da página de produtos
 * 
 * Retorna APENAS ProductsActions (elements fica privado)
 * Isso força que todas as interações passem por métodos centralizados
 * 
 * @param {Page} page - Página Playwright
 * @returns {ProductsActions} Ações disponíveis (sem acesso direto aos elements)
 * 
 * @example
 * // Uso correto (padrão forçado)
 * const products = createProductsPage(page);
 * await products.productsValidation();
 * await products.clickProduct('Sauce Labs Backpack');
 * 
 * @example
 * // ❌ Não funciona mais (elements privado)
 * // await products.elements.inventoryItem.click();
 */
export function createProductsPage(page: Page): ProductsActions {
  const elements = new ProductsElements(page);
  const actions = new ProductsActions(elements);
  
  return actions;  // Retorna APENAS actions
}
