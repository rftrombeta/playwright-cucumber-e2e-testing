/**
 * Barrel export for Login page
 * Exporta APENAS LoginActions para forçar uso de ações centralizadas
 * 
 * ⚠️ LoginElements NÃO é exportado para evitar uso direto dos locators
 * Isso garante padronização: todas as interações devem passar por Actions
 * 
 * @module support/pages/login
 * 
 * @example
 * import { createLoginPage } from './login';
 * 
 * const login = createLoginPage(page);
 * await login.login('user', 'pass');  // ✅ Correto: usa Actions
 * 
 * // ❌ Errado: não consegue acessar elements diretamente
 * // login.elements.usernameInput.fill('user');
 */
export { LoginActions } from './LoginActions';
// LoginElements não é exportado intencionalmente

import { Page } from '@playwright/test';
import { LoginElements } from './LoginElements';
import { LoginActions } from './LoginActions';

/**
 * Factory function para criar instância da página de login
 * 
 * Retorna APENAS LoginActions (elements fica privado)
 * Isso força que todas as interações passem por métodos centralizados
 * 
 * @param {Page} page - Página Playwright
 * @returns {LoginActions} Ações disponíveis (sem acesso direto aos elements)
 * 
 * @example
 * // Uso correto (padrão forçado)
 * const login = createLoginPage(page);
 * await login.gotoSwaglabs();
 * await login.login('standard_user', 'secret_sauce');
 * 
 * @example
 * // ❌ Não funciona mais (elements privado)
 * // await login.elements.usernameInput.fill('user');
 */
export function createLoginPage(page: Page): LoginActions {
  const elements = new LoginElements(page);
  const actions = new LoginActions(elements);
  
  return actions;  // Retorna APENAS actions
}
