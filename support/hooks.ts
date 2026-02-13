import { Before, After, AfterStep, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import * as fs from 'fs';
import { createLoginPage } from './pages/login';
import { context, resetContext } from './context';
import { takeScreenshot, takeScreenshotOnError, cleanOldScreenshots } from './screenshot';
import { createProductsPage } from './pages/products';
import { createCartPage } from './pages/cart';
import { buildVideoFilePath, cleanOldVideos, ensureVideosDir, getVideosDir } from './video';

/**
 * Configurações globais do Cucumber
 */
setDefaultTimeout(30 * 1000);  // 30 segundos por step

/**
 * Hook executado ANTES de cada cenário
 * 
 * Responsabilidades:
 * - Resetar contexto global
 * - Lançar navegador Chromium
 * - Criar nova página
 * - Instanciar Page Objects (LoginActions)
 * 
 * Variáveis de ambiente:
 * - HEADLESS=false  → Navegador visível (default: true)
 * - SLOWMO=1000     → Desacelera ações em ms
 * 
 * @async
 * @function Before
 * 
 * @example
 * // Executado automaticamente antes de cada Cenário
 * HEADLESS=false npm run test:cucumber  // Com interface visual
 */
Before(async function () {
    // Resetar contexto para garantir limpeza
    resetContext();

    // Ler variável de ambiente para headless
    // HEADLESS=false npm run test:cucumber   → Navegador visível
    // HEADLESS=true npm run test:cucumber    → Headless (padrão)
    const headless = process.env.HEADLESS !== 'false';
    const slowMo = process.env.SLOWMO ? parseInt(process.env.SLOWMO) : undefined;
    const captureVideo = process.env.VIDEO !== 'false';

    // Lançar navegador
    context.browser = await chromium.launch({
        headless,
        slowMo,  // Opcional: para debug visual
    });

    // Criar contexto e página (com vídeo por cenário)
    if (captureVideo) {
        ensureVideosDir();
        context.browserContext = await context.browser!.newContext({
            recordVideo: {
                dir: getVideosDir(),
                size: { width: 1280, height: 720 }
            }
        });
    } else {
        context.browserContext = await context.browser!.newContext();
    }

    context.page = await context.browserContext.newPage();

    // Instanciar ações (métodos reutilizáveis)
    context.loginActions = createLoginPage(context.page);
    context.productsActions = createProductsPage(context.page);
    context.cartActions = createCartPage(context.page);
});

/**
 * Hook executado DEPOIS de cada step
 * 
 * Captura screenshot após cada step para visualizar progresso
 * E anexa ao relatório do Cucumber
 * 
 * Variáveis de ambiente:
 * - SCREENSHOTS=true  → Sempre capturar (desenvolvimento)
 * - SCREENSHOTS=false → Não capturar (testes rápidos)
 * - Sem env var               → Auto-detect (desenvolvimento=true, CI=false)
 * 
 * @async
 * @function AfterStep
 */
AfterStep(async function (step) {
    // Detectar se deve capturar screenshots
    let captureScreenshots = true;  // Default: sempre em desenvolvimento

    if (process.env.SCREENSHOTS !== undefined) {
        captureScreenshots = process.env.SCREENSHOTS === 'true';
    } else if (process.env.CI === 'true') {
        // Em CI/CD, capturar por padrão (GitHub Actions, GitLab, etc)
        captureScreenshots = true;
    }

    if (!captureScreenshots) {
        return;  // Pular captura se desabilitado
    }

    if (context.page) {
        const stepName = step.pickleStep?.text || 'unknown-step';
        const screenshotPath = await takeScreenshot(context.page, `step-${stepName}`);

        // Anexar screenshot ao relatório
        if (screenshotPath) {
            try {
                this.attach(
                    require('fs').readFileSync(screenshotPath),
                    'image/png'
                );
            } catch (error) {
                console.error(`Erro ao anexar screenshot: ${error}`);
            }
        }
    }
});

/**
 * Hook executado DEPOIS de cada cenário
 * 
 * Responsabilidades:
 * - Capturar screenshot em caso de erro
 * - Fechar página
 * - Fechar navegador
 * - Limpar recursos
 * 
 * ⚠️ Executado mesmo se o cenário falhar
 * Garante que recursos sempre sejam liberados
 * 
 * @async
 * @function After
 * 
 * @example
 * // Executado automaticamente após cada Cenário (sucesso ou erro)
 */
After(async function (scenario) {
    let rawVideoPath = '';
    let recordedVideo: ReturnType<NonNullable<typeof context.page>['video']> | null = null;
    const attachVideo = process.env.ATTACH_VIDEO !== 'false';

    let attachScreenshots = true;
    const screenshotMode = process.env.SCREENSHOTS;
    if (screenshotMode !== undefined) {
        attachScreenshots = screenshotMode === 'true' || screenshotMode === 'on-fail';
    } else if (process.env.CI === 'true') {
        attachScreenshots = true;
    }

    // Se o cenário falhou, capturar screenshot
    if (attachScreenshots && scenario.result?.status === 'FAILED' && context.page) {
        const screenshotPath = await takeScreenshotOnError(
            context.page,
            scenario.pickle?.name || 'unknown-scenario'
        );

        // Anexar screenshot ao relatório
        if (screenshotPath) {
            this.attach(
                require('fs').readFileSync(screenshotPath),
                'image/png'
            );
        }
    }

    // Fechar página e salvar vídeo do cenário
    if (context.page) {
        recordedVideo = context.page.video();
        await context.page.close();
    }

    // Fechar contexto do navegador
    if (context.browserContext) {
        await context.browserContext.close();
    }

    if (recordedVideo) {
        try {
            rawVideoPath = await recordedVideo.path();
        } catch (error) {
            console.error(`Erro ao obter caminho do vídeo: ${error}`);
        }
    }

    if (rawVideoPath && fs.existsSync(rawVideoPath) && fs.statSync(rawVideoPath).size > 0) {
        const scenarioName = scenario.pickle?.name || 'unknown-scenario';
        const finalVideoPath = buildVideoFilePath(scenarioName);

        try {
            fs.renameSync(rawVideoPath, finalVideoPath);
        } catch {
            fs.copyFileSync(rawVideoPath, finalVideoPath);
            fs.unlinkSync(rawVideoPath);
        }
        context.lastVideoPath = finalVideoPath;

        if (attachVideo) {
            try {
                this.attach(
                    fs.readFileSync(finalVideoPath),
                    'video/webm'
                );
            } catch (error) {
                console.error(`Erro ao anexar vídeo no relatório: ${error}`);
            }

            this.attach(`Vídeo do cenário salvo em: ${finalVideoPath}`, 'text/plain');
        }
    }

    // Fechar navegador
    if (context.browser) {
        await context.browser.close();
    }

    // Limpar screenshots com mais de 7 dias
    cleanOldScreenshots(7);
    cleanOldVideos(7);
});
