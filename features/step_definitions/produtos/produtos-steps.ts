import {
    Given as Dado,
    When as Quando,
    Then as Então,
    DataTable
} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { context } from '../../../support/context';

/**
 * Steps para Produtos do Sauce Labs
 * 
 * @module produtos-steps
 */

// ========================================
// GIVEN - Precondições
// ========================================

/**
 * Realiza login com usuário específico
 * 
 * @example
 * Dado que estou logado com o usuário "standard_user"
 */
Dado('que estou logado com o usuario {string}', async (username: string) => {
    await context.loginActions!.gotoSwaglabs();
    await context.loginActions!.formloginValidation();
    await context.loginActions!.login(username, 'secret_sauce');

    context.currentUser = { username, password: 'secret_sauce' };
});

/**
 * Valida elementos principais da página de produtos
 * 
 * @example
 * Dado que valido que a página de produtos carregou corretamente
 */
Dado('valido que a pagina de produtos carregou corretamente', async () => {
    await context.productsActions!.formProductsValidation();
});

// ========================================
// THEN - Verificações (Lista de Produtos)
// ========================================

/**
 * Valida contagem de produtos
 * 
 * @example
 * Então devem existir 6 produtos na página
 */
Então('devem existir {int} produtos na pagina', async (expectedCount: number) => {
    const productsPage = context.productsActions!;
    const actualCount = await productsPage.getProductCount();

    expect(actualCount).toBe(expectedCount);
});

// ========================================
// WHEN - Ações (Lista de Produtos)
// ========================================

/**
 * Obtém a lista de produtos
 * 
 * @example
 * Quando obtenho a lista de produtos
 */
Quando('obtenho a lista de produtos', async () => {
    const productsActions = context.productsActions!;
    const products = await productsActions.listProducts();

    context.currentUser = { ...context.currentUser!, username: `products:${products.join(',')}` };
});

/**
 * Valida se a lista contém produtos específicos
 * 
 * @example
 * Então a lista deve conter os seguintes produtos:
 *   | Sauce Labs Backpack |
 */
Então('a lista deve conter os seguintes produtos:', async (dataTable: DataTable) => {
    const productsActions = context.productsActions!;
    const expectedProducts = dataTable.raw().flat();
    const actualProducts = await productsActions.listProducts();

    expectedProducts.forEach(expectedProduct => {
        const exists = actualProducts.some(p =>
            p.toLowerCase().includes(expectedProduct.toLowerCase())
        );
        expect(exists, `Produto "${expectedProduct}" não encontrado na lista`).toBe(true);
    });
});

// ========================================
// WHEN - Ações (Detalhes do Produto)
// ========================================

/**
 * Clica em um produto pelo nome
 * 
 * @example
 * Quando clico no produto "Sauce Labs Backpack"
 */
Quando('clico no produto {string}', async (productName: string) => {
    const productsActions = context.productsActions!;
    await productsActions.clickProduct(productName);

    context.currentUser = { ...context.currentUser!, username: `viewing:${productName}` };
});

/**
 * Valida se está na página de detalhes do produto
 * 
 * @example
 * E valido que estou na página de detalhes do produto
 */
Quando('valido que estou na pagina de detalhes do produto', async () => {
    const productsActions = context.productsActions!;
    await productsActions.productDetailsValidationPage();
});

// ========================================
// THEN - Verificações (Detalhes do Produto)
// ========================================

/**
 * Valida preço específico do produto
 * 
 * @example
 * Então o preço deve ser "$29.99"
 */
Então('o preco deve ser {string}', async (expectedPrice: string) => {
    const productsActions = context.productsActions!;
    await productsActions.validateProductPrice(expectedPrice);
});

// ========================================
// WHEN - Navegação
// ========================================

/**
 * Clica no botão voltar para a página de produtos
 * 
 * @example
 * E clico no botão voltar
 */
Quando('clico no botao voltar', async () => {
    const productsActions = context.productsActions!;
    await productsActions.clickBackButton();

    // Aguarda para garantir que voltou
    await new Promise(resolve => setTimeout(resolve, 500));
});

