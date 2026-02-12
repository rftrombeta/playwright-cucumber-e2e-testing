#!/usr/bin/env node

/**
 * Script para gerar relatório HTML melhorado com screenshots
 * 
 * Uso:
 * npm run report
 */

const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON gerado pelo Cucumber
const jsonFile = 'cucumber-report.json';
const htmlFile = 'cucumber-report.html';

// Verificar se arquivo existe
if (!fs.existsSync(jsonFile)) {
  console.error(
    `❌ Arquivo ${jsonFile} não encontrado. Execute os testes primeiro!`
  );
  process.exit(1);
}

// Ler dados do JSON
const jsonData = JSON.parse(fs.readFileSync(jsonFile));

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
  console.log(`✅ Relatório gerado com sucesso: ${htmlFile}`);
  console.log(`📸 Screenshots: test-results/screenshots/`);
} catch (error) {
  console.error(`❌ Erro ao gerar relatório: ${error.message}`);
  process.exit(1);
}
