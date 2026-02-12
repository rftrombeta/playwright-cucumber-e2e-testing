import { Page } from '@playwright/test';
import { CartElements } from './CartElements';
import { CartActions } from './CartActions';

/**
 * Factory function para criar instância de CartActions
 * 
 * @param {Page} page - Instância da página do Playwright
 * @returns {CartActions} Instância de CartActions
 * 
 * @example
 * import { createCartPage } from './support/pages/cart';
 * 
 * const cartActions = createCartPage(page);
 * await cartActions.addProductToCart('Sauce Labs Backpack');
 */
export function createCartPage(page: Page): CartActions {
  const elements = new CartElements(page);
  return new CartActions(elements);
}

// Exporta apenas Actions - Elements são privados
export { CartActions } from './CartActions';
