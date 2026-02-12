#!/usr/bin/env node

/**
 * Script para gerar relatório HTML melhorado com screenshots
 * 
 * Uso:
 * npm run report
 */

const reporter = require('cucumber-html-reporter');
const fs = require('fs');

// Caminho para o arquivo JSON gerado pelo Cucumber
const jsonFile = 'cucumber-report.json';
const htmlFile = 'cucumber-custom-report.html';

// Verificar se arquivo existe
if (!fs.existsSync(jsonFile)) {
  console.error(
    `❌ Arquivo ${jsonFile} não encontrado. Execute os testes primeiro!`
  );
  process.exit(1);
}

function injectInlineVideoPlayers(reportPath) {
  if (!fs.existsSync(reportPath)) return;

  const html = fs.readFileSync(reportPath, 'utf-8');

  const videoLinkPattern = /<a\s+href="(data:[^"]+)"\s+download="file\.webm">\s*download file\s*<\/a>/gi;

  const updated = html.replace(videoLinkPattern, (_match, videoDataUri) => {
    const mimeTypeMatch = /^data:([^;]+);base64,/i.exec(videoDataUri);
    const sourceMimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'video/webm';

    return [
      '<div style="margin:12px 0;">',
      `  <video controls preload="metadata" width="720">`,
      `    <source src="${videoDataUri}" type="${sourceMimeType}" />`,
      '    Seu navegador não suporta vídeo WebM.',
      '  </video>',
      '  <br/>',
      `  <a href="${videoDataUri}" download="scenario.webm">Baixar vídeo</a>`,
      '</div>'
    ].join('\n');
  });

  fs.writeFileSync(reportPath, updated, 'utf-8');
}

// Obter informações do sistema
const os = require('os');
const platformName = os.platform();
const platformVersion = os.release();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const executionTime = new Date().toLocaleString('pt-BR');

// Opções do relatório
const options = {
  theme: 'bootstrap',  // 'bootstrap' ou 'foundation'
  jsonFile: jsonFile,
  output: htmlFile,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,  // Não abrir automaticamente
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'QA',
    'Browser': 'Chromium 123.0.0',
    'Platform': `${platformName} ${platformVersion}`,
    'Execution': executionTime,
    'Timezone': timezone
  }
};

// Gerar relatório
try {
  reporter.generate(options);
  injectInlineVideoPlayers(htmlFile);
  console.log(`✅ Relatório gerado com sucesso: ${htmlFile}`);
  console.log(`📸 Screenshots: test-results/screenshots/`);
} catch (error) {
  console.error(`❌ Erro ao gerar relatório: ${error.message}`);
  process.exit(1);
}
