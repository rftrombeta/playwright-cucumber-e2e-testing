# Relatórios do projeto

Este documento cobre apenas geração e publicação de relatório.

Para instalação e comandos gerais de execução, consulte [README.md](README.md).

## Relatório mantido no projeto

O projeto publica somente o relatório customizado do Cucumber:

- Arquivo local: cucumber-custom-report.html
- Script de geração: generate-report.js

## Geração local

1. Execute os testes Cucumber:

```bash
npm run test:cucumber
```

2. Gere o HTML customizado:

```bash
npm run report
```

Saídas esperadas:
- cucumber-custom-report.html
- cucumber-report.json
- test-results/screenshots/

## Publicação online (GitHub Pages)

Workflow responsável: [e2e-reports.yml](.github/workflows/e2e-reports.yml)

Fluxo atual:
1. Instala dependências e browsers.
2. Executa Cucumber.
3. Gera cucumber-custom-report.html.
4. Publica o próprio relatório como index do GitHub Pages.

URL publicada:
- https://rftrombeta.github.io/playwright-cucumber-e2e-testing/

## Observações

- O acesso da URL abre diretamente o relatório customizado.
- Se o relatório não for gerado em uma execução, o workflow publica uma página fallback informando o problema.
