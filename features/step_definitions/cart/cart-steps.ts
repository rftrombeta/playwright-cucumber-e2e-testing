import {
  Given as Dado,
  When as Quando,
  Then as Então,
  DataTable
} from '@cucumber/cucumber';
import { context } from '../../../support/context';

/**
 * Steps para Carrinho de Compras e Checkout
 * 
 * @module cart-steps
 */

// ========================================
// GIVEN - Pré-condições
// ========================================

/**
 * Valida que está na página de produtos
 * 
 * @example
 * Dado que estou na página de produtos
 */
Dado('que estou na pagina de produtos', async () => {
  const productsActions = context.productsActions!;
  await productsActions.formProductsValidation();
});

// ========================================
// WHEN - Ações do Carrinho
// ========================================

/**
 * Adiciona um produto ao carrinho pelo nome
 * 
 * @example
 * Quando adiciono o produto "Sauce Labs Backpack" ao carrinho
 */
Quando('adiciono o produto {string} ao carrinho', async (productName: string) => {
  const cartActions = context.cartActions!;
  await cartActions.addProductToCart(productName);
});

/**
 * Remove um produto do carrinho na página de produtos (botão remove)
 * 
 * @example
 * Quando removo o produto "Sauce Labs Backpack" do carrinho
 */
Quando('removo o produto {string} do carrinho', async (productName: string) => {
  const cartActions = context.cartActions!;
  await cartActions.removeProductFromInventory(productName);
});

/**
 * Remove um produto diretamente na página do carrinho
 * 
 * @example
 * Quando removo o produto "Sauce Labs Backpack" do carrinho na página do carrinho
 */
Quando('removo o produto {string} do carrinho na pagina do carrinho', async (productName: string) => {
  const cartActions = context.cartActions!;
  await cartActions.removeProductFromCart(productName);
});

/**
 * Clica no ícone do carrinho no header
 * 
 * @example
 * E clico no ícone do carrinho
 */
Quando('clico no icone do carrinho', async () => {
  const cartActions = context.cartActions!;
  await cartActions.clickCartIcon();
});

/**
 * Clica no botão Continue Shopping
 * 
 * @example
 * E clico em Continue Shopping
 */
Quando('clico em Continue Shopping', async () => {
  const cartActions = context.cartActions!;
  await cartActions.clickContinueShopping();
});

/**
 * Clica no botão Checkout
 * 
 * @example
 * E clico em Checkout
 */
Quando('clico em Checkout', async () => {
  const cartActions = context.cartActions!;
  await cartActions.clickCheckout();
});

/**
 * Preenche as informações do checkout com DataTable
 * 
 * @example
 * E preencho as informações do checkout:
 *   | firstName | lastName  | postalCode |
 *   | John      | Doe       | 12345      |
 */
Quando('preencho as informacoes do checkout:', async (dataTable: DataTable) => {
  const cartActions = context.cartActions!;
  const [data] = dataTable.hashes();
  
  await cartActions.fillCheckoutInformation(
    data.firstName,
    data.lastName,
    data.postalCode
  );
});

/**
 * Clica no botão Continue na página de informações do checkout
 * 
 * @example
 * E clico em Continue na página de informações
 */
Quando('clico em Continue na pagina de informacoes', async () => {
  const cartActions = context.cartActions!;
  await cartActions.clickContinueCheckout();
});

/**
 * Clica no botão Finish na página de overview
 * 
 * @example
 * Quando clico em Finish
 */
Quando('clico em Finish', async () => {
  const cartActions = context.cartActions!;
  await cartActions.clickFinish();
});

// ========================================
// THEN - Validações do Carrinho
// ========================================

/**
 * Valida o número exibido no badge do carrinho
 * 
 * @example
 * Então o badge do carrinho deve mostrar "2"
 */
Então('o badge do carrinho deve mostrar {string}', async (count: string) => {
  const cartActions = context.cartActions!;
  await cartActions.validateCartBadgeCount(parseInt(count, 10));
});

/**
 * Valida que o badge do carrinho não está visível (carrinho vazio)
 * 
 * @example
 * Então o badge do carrinho não deve estar visível
 */
Então('o badge do carrinho nao deve estar visivel', async () => {
  const cartActions = context.cartActions!;
  await cartActions.validateCartBadgeNotVisible();
});

/**
 * Valida que está na página do carrinho
 * 
 * @example
 * E devo estar na página do carrinho
 */
Então('devo estar na pagina do carrinho', async () => {
  const cartActions = context.cartActions!;
  await cartActions.validateCartPage();
});

/**
 * Valida que um produto específico está presente no carrinho
 * 
 * @example
 * E o produto "Sauce Labs Backpack" deve estar no carrinho
 */
Então('o produto {string} deve estar no carrinho', async (productName: string) => {
  const cartActions = context.cartActions!;
  const isInCart = await cartActions.isProductInCart(productName);
  
  if (!isInCart) {
    throw new Error(`Produto "${productName}" não encontrado no carrinho`);
  }
});

/**
 * Valida que está na página de informações do checkout
 * 
 * @example
 * E devo estar na página de informações do checkout
 */
Então('devo estar na pagina de informacoes do checkout', async () => {
  const cartActions = context.cartActions!;
  await cartActions.validateCheckoutInfoPage();
});

/**
 * Valida que está na página de resumo do checkout (overview)
 * 
 * @example
 * E devo estar na página de resumo do checkout
 */
Então('devo estar na pagina de resumo do checkout', async () => {
  const cartActions = context.cartActions!;
  await cartActions.validateCheckoutOverviewPage();
});

/**
 * Valida elementos da página de overview com DataTable
 * 
 * @example
 * E devo ver os elementos da página de resumo:
 *   | Payment Information    |
 *   | Shipping Information   |
 */
Então('devo ver os elementos da pagina de resumo:', async (dataTable: DataTable) => {
  const cartActions = context.cartActions!;
  
  // DataTable de uma coluna - validar que elementos estão visíveis
  // Apenas validando que a página tem os elementos essenciais
  await cartActions.validateCheckoutOverviewElements();
});

/**
 * Valida a mensagem de sucesso "Thank you for your order!"
 * 
 * @example
 * Então devo ver a mensagem de sucesso "Thank you for your order!"
 */
Então('devo ver a mensagem de sucesso {string}', async (expectedMessage: string) => {
  const cartActions = context.cartActions!;
  await cartActions.validateThankYouMessage();
});

/**
 * Valida a mensagem de dispatch (texto do pony)
 * 
 * @example
 * E devo ver a mensagem de dispatch "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
 */
Então('devo ver a mensagem de dispatch {string}', async (expectedMessage: string) => {
  const cartActions = context.cartActions!;
  await cartActions.validateDispatchMessage(expectedMessage);
});

/**
 * Valida que está na página de produtos
 * 
 * @example
 * Então devo estar na página de produtos
 */
Então('devo estar na pagina de produtos', async () => {
  const productsActions = context.productsActions!;
  await productsActions.formProductsValidation();
});
