# Automacao Playwright + Cucumber E2E

Projeto de automação E2E para o site https://www.saucedemo.com/, usando Playwright e Cucumber com relatório HTML customizado.

Documentação complementar:
- Guia de relatórios e publicação: [REPORT.md](REPORT.md)

## Requisitos
- Node.js 18+

## Instalação

1. Instalar dependências:

```bash
npm install
```

2. Instalar navegadores do Playwright:

```bash
npm run install-browsers
```

## Comandos principais

### Cucumber (fluxo principal do projeto)

Executar todos os cenários:

```bash
npm run test:cucumber
```

Executar por tag:

```bash
npm run test:cucumber:tag "@001"
```

Gerar relatório customizado após execução:

```bash
npm run report
```

### Playwright (apoio/debug)

Executar testes Playwright:

```bash
npm test
```

Executar em modo UI:

```bash
npm run test:ui
```

Codegen:

```bash
npm run codegen
```

## Variáveis de ambiente úteis

Credenciais (quando necessário):

```bash
export SAUCEDEMO_USERNAME="standard_user"
export SAUCEDEMO_PASSWORD="secret_sauce"
```

Execução Cucumber:

```bash
HEADLESS=false npm run test:cucumber
SLOWMO=1000 npm run test:cucumber
```

## Relatório online

O workflow [e2e-reports.yml](.github/workflows/e2e-reports.yml) publica o relatório customizado automaticamente no GitHub Pages a cada push na main:

- https://rftrombeta.github.io/playwright-cucumber-e2e-testing/

Para detalhes de geração local, screenshots e publicação, consulte [REPORT.md](REPORT.md).
