import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utilitário para capturar screenshots durante testes Cucumber
 */

const SCREENSHOTS_DIR = 'test-results/screenshots';

/**
 * Garante que o diretório de screenshots existe
 */
export function ensureScreenshotsDir() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
}

/**
 * Captura screenshot da página atual
 * 
 * @param page - Página Playwright
 * @param name - Nome descritivo para o screenshot
 * @returns Caminho relativo do arquivo
 * 
 * @example
 * const screenshotPath = await takeScreenshot(page, 'login-success');
 */
export async function takeScreenshot(page: Page, name: string): Promise<string> {
  ensureScreenshotsDir();
  
  // Gerar timestamp para evitar conflitos
  const timestamp = new Date().toISOString().replace(/[\\/:*?"<>|]/g, '-');
  const filename = `${name}-${timestamp}.png`;
  const filepath = path.join(SCREENSHOTS_DIR, filename);
  
  try {
    await page.screenshot({ 
      path: filepath,
      fullPage: true  // Captura página inteira
    });
    
    // Retornar caminho relativo para relatório
    return filepath;
  } catch (error) {
    console.error(`Erro ao capturar screenshot: ${error}`);
    return '';
  }
}

/**
 * Captura screenshot apenas em caso de erro
 * 
 * @param page - Página Playwright
 * @param testName - Nome do teste
 * @returns Caminho relativo do arquivo (vazio se não houver erro)
 * 
 * @example
 * await takeScreenshotOnError(page, 'login-test');
 */
export async function takeScreenshotOnError(
  page: Page,
  testName: string
): Promise<string> {
  return takeScreenshot(page, `ERROR-${testName}`);
}

/**
 * Limpar screenshots antigos (mais de X dias)
 * 
 * @param daysOld - Quantos dias para manter
 * 
 * @example
 * cleanOldScreenshots(7);  // Manter apenas últimos 7 dias
 */
export function cleanOldScreenshots(daysOld: number = 7) {
  const now = Date.now();
  const maxAge = daysOld * 24 * 60 * 60 * 1000;
  
  if (!fs.existsSync(SCREENSHOTS_DIR)) return;
  
  fs.readdirSync(SCREENSHOTS_DIR).forEach(file => {
    const filepath = path.join(SCREENSHOTS_DIR, file);
    const stats = fs.statSync(filepath);
    
    if (now - stats.mtimeMs > maxAge) {
      fs.unlinkSync(filepath);
    }
  });
}
