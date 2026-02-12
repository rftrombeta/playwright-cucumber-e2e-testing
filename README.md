# Automacao Playwright E2E

Projeto de automação E2E usando Playwright para testes do site https://front.serverest.dev

## Cucumber + Relatórios

### Executar testes Cucumber
```bash
npm run test:cucumber
```

### Gerar relatório customizado
```bash
npm run report
```

### Arquivos de relatório gerados
- `cucumber-native-report.html` (HTML nativo do Cucumber)
- `cucumber-custom-report.html` (HTML customizado via `cucumber-html-reporter`)
- `cucumber-report.json` (dados brutos)

## Publicação dos relatórios (GitHub Pages)

O workflow em `.github/workflows/e2e-reports.yml` executa os testes e publica os relatórios automaticamente a cada push na branch `main`.

Após o deploy, acesse:
- `https://rftrombeta.github.io/playwright-cucumber-e2e-testing/`

## Requisitos
- Node.js 18+ recomendado

## Instalação

### 1. Instalar dependências
```bash
npm install
```

### 2. Instalar navegadores Playwright
```bash
npm run install-browsers
```

## Executar Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes com interface gráfica (UI Mode)
```bash
npm run test:ui
```

### Executar teste específico
```bash
npx playwright test tests/e2e/login/login.spec.ts
```

### Executar teste com navegador visível
```bash
npx playwright test tests/e2e/login/login.spec.ts --headed
```

### Executar teste por padrão de nome
```bash
npx playwright test -g "validar elementos"
```

### Gerar testes com Codegen
```bash
npm run codegen
```

Ou para uma URL específica:
```bash
npx playwright codegen https://front.serverest.dev/login
```

## Variáveis de Ambiente

Para testes que incluem login, defina:
```bash
export SERVEREST_EMAIL="seu-email@example.com"
export SERVEREST_PASSWORD="sua-senha"
```

## Estrutura de Pastas
```
tests/
  e2e/
    login/
      login.spec.ts       # Testes de validação e login
      cadastro.spec.ts    # Testes de cadastro
```

## Troubleshooting

Se os testes falharem e relatar seletores não encontrados, use:
```bash
npx playwright test --debug
```

Para gerar relatórios com screenshots:
```bash
npx playwright show-report
```
