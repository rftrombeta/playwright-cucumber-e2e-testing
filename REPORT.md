# 📊 Guia de Relatórios

Este documento é um resumo rápido de geração e publicação de relatórios.

Para documentação completa:
- Visão geral do projeto: [README.md](README.md)
- Estratégia, padrões e execução detalhada: [TESTING.md](TESTING.md)

---

## Relatório oficial do projeto

O projeto mantém **apenas** o relatório customizado do Cucumber:

- Arquivo gerado: `cucumber-custom-report.html`
- Gerador: `generate-report.js`

---

## Geração local

```bash
npm run test:cucumber
npm run report
```

Saídas esperadas:
- `cucumber-custom-report.html`
- `cucumber-report.json`
- `test-results/screenshots/`
- `test-results/videos/`

---

## Publicação automática (GitHub Pages)

- Workflow: [.github/workflows/e2e-reports.yml](.github/workflows/e2e-reports.yml)
- URL: https://rftrombeta.github.io/playwright-cucumber-e2e-testing/

O deploy publica o próprio relatório customizado como página inicial.

### Vídeo por cenário

O projeto grava vídeo por cenário de forma incremental ao final da execução.

- Padrão: habilitado
- Desabilitar: `VIDEO=false npm run test:cucumber`
- Arquivos: `test-results/videos/*.webm`

### Vídeos no GitHub Actions

Os vídeos também ficam disponíveis para download como artifact da pipeline:

- Artifact: `cucumber-videos`
- Retenção: `7` dias
- Caminho no artifact: `test-results/videos/`

### Vídeos no GitHub Pages (HTML)

Além do artifact, os vídeos também são publicados em uma página HTML:

- URL: `https://rftrombeta.github.io/playwright-cucumber-e2e-testing/videos/`
- Formato: galeria com player `<video>` para cada arquivo `.webm`
