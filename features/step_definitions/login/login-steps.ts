import {
  Given as Dado,
  When as Quando,
  Then as Então,
  DataTable
} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { context } from '../../../support/context';

/**
 * Steps para Login do Sauce Labs
 * 
 * @module login-steps
 */

// ========================================
// GIVEN - Precondições
// ========================================

/**
 * Valida que estou na página de login
 * 
 * @example
 * Dado que estou na página de login do Sauce Labs
 */
Dado('que estou na página de login do Sauce Labs', async () => {
  await context.loginActions!.gotoSwaglabs();
  await context.loginActions!.formloginValidation();
});

// ========================================
// WHEN - Ações
// ========================================

/**
 * Preenche o campo de usuário
 * 
 * @example
 * Quando preencho o campo de usuário com "standard_user"
 */
Quando('preencho o campo de usuário com {string}', async (username: string) => {
  await context.loginActions!.fillUsername(username);
  context.currentUser = { username, password: '' };
});

/**
 * Preenche o campo de senha
 * 
 * @example
 * E preencho o campo de senha com "secret_sauce"
 */
Quando('preencho o campo de senha com {string}', async (password: string) => {
  await context.loginActions!.fillPassword(password);
  if (context.currentUser) {
    context.currentUser.password = password;
  }
});

/**
 * Clica no botão Login
 * 
 * @example
 * E clico no botão Login
 */
Quando('clico no botão Login', async () => {
  await context.loginActions!.clickLoginButton();
});

/**
 * Clica no botão Login sem preencher campos
 * 
 * @example
 * Quando clico no botão Login sem preencher campos
 */
Quando('clico no botão Login sem preencher campos', async () => {
  await context.loginActions!.clickLoginButton();
});

// ========================================
// THEN - Verificações
// ========================================

/**
 * Valida login bem-sucedido
 * 
 * @example
 * Então devo estar logado com sucesso
 */
Então('devo estar logado com sucesso', async () => {
  const inventoryContainer = context.page!.locator('div.inventory_container');
  await expect(inventoryContainer).toBeVisible();
});

/**
 * Valida que a página de produtos está visível
 * 
 * @example
 * Então devo ver a página de produtos
 */
Então('devo ver a página de produtos', async () => {
  const productList = context.page!.locator('div.inventory_list');
  await expect(productList).toBeVisible();

  const products = context.page!.locator('div.inventory_item');
  const count = await products.count();
  expect(count).toBeGreaterThan(0);
});

/**
 * Valida mensagem de erro de login
 * 
 * @example
 * Então devo ver mensagem de erro de login
 */
Então('devo ver mensagem de erro de login', async () => {
  const errorMessage = context.page!.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();

  const errorText = await errorMessage.textContent();
  expect(errorText).toContain('Username and password do not match');

  context.lastError = errorText || '';
});

/**
 * Valida mensagem de usuário bloqueado
 * 
 * @example
 * Então devo ver mensagem de usuário bloqueado
 */
Então('devo ver mensagem de usuário bloqueado', async () => {
  const errorMessage = context.page!.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();

  const errorText = await errorMessage.textContent();
  expect(errorText).toContain('Sorry, this user has been locked out.');

  context.lastError = errorText || '';
});

/**
 * Valida elementos específicos na página de login
 * 
 * @example
 * Então devo ver os seguintes elementos na página de login:
 *   | Logo Swag Labs |
 *   | Campo Username |
 */
Então('devo ver os seguintes elementos na página de login:', async (dataTable: DataTable) => {
  const elementos = dataTable.raw().map(row => row[0]);

  for (const elemento of elementos) {
    await context.loginActions!.validateElement(elemento);
  }
});

/**
 * Valida mensagem de erro obrigatório
 * 
 * @example
 * Então devo ver mensagem de erro obrigatório
 */
Então('devo ver mensagem de erro obrigatório', async () => {
  const errorMessage = context.page!.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();

  const errorText = await errorMessage.textContent();
  expect(errorText).toContain('required');

  context.lastError = errorText || '';
});
