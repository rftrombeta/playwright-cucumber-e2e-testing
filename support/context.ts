import { Browser, Page } from '@playwright/test';
import { LoginActions } from './pages/login';
import { ProductsActions } from './pages/products';
import { CartActions } from './pages/cart';

/**
 * Contexto global para armazenar estado entre steps do Cucumber
 * 
 * Compartilhado entre todos os steps durante um cenário
 * 
 * @interface SauceLabsContext
 */
export interface SauceLabsContext {
  browser?: Browser;         // ← Instância do navegador Chromium
  page?: Page;               // ← Página do navegador
  loginActions?: LoginActions;  // ← Ações de login
  productsActions?: ProductsActions;  // ← Ações da página de produtos
  cartActions?: CartActions;      // ← Ações do carrinho e checkout
  currentUser?: {            // ← Dados do usuário atual
    username: string;
    password: string;
  };
  lastError?: string;        // ← Último erro capturado
}

/**
 * Contexto global instanciado
 * Será preenchido pelo hook Before de features/support/hooks.ts
 * 
 * @type {SauceLabsContext}
 */
export let context: SauceLabsContext = {};

/**
 * Reseta o contexto para estado inicial
 * Útil para começar um novo cenário limpo
 * 
 * @function resetContext
 * @example
 * resetContext();  // Limpar contexto entre cenários
 */
export function resetContext() {
  context = {};
}
