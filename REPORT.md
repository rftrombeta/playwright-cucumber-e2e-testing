# 🎯 Relatório Cucumber com Screenshots

## 📸 Funcionalidades

✅ **Screenshots automáticos** após cada step
✅ **Screenshots de erro** em cenários falhados
✅ **Relatório HTML melhorado** com bootstrap
✅ **Metadata do teste** (ambiente, browser, timestamp)
✅ **Limpeza automática** de screenshots antigos

---

## 🚀 Como usar

### 1️⃣ Executar testes com relatório melhorado

```bash
# Executar e gerar relatório
npm run test:cucumber:report

# Ou separa os passos
npm run test:cucumber         # Executar testes
npm run report                # Gerar relatório
npm run test:cucumber:html    # Abrir relatório
```

### 2️⃣ Visualizar relatório gerado

O relatório HTML será gerado em:
```
cucumber-native-report.html   (Cucumber nativo)
cucumber-custom-report.html   (Cucumber custom)
```

Screenshots são salvos em:
```
test-results/screenshots/
```

---

## 🔧 Variáveis de Ambiente

### Modo Visual (com navegador)
```bash
HEADLESS=false npm run test:cucumber:tag "@001"
```

### Câmera Lenta (1 segundo entre ações)
```bash
SLOWMO=1000 npm run test:cucumber:tag "@001"
```

### Combinar ambas
```bash
HEADLESS=false SLOWMO=1000 npm run test:cucumber:tag "@001"
```

---

## 📊 O que vem no Relatório

- ✅ **Resumo geral** (total de cenários, passou/falhou/pulado)
- ✅ **Duração** de cada cenário
- ✅ **Screenshot após cada step**
- ✅ **Screenshot de erro** (destacado em vermelho)
- ✅ **Metadata**:
  - Versão da app
  - Ambiente de teste
  - Browser usado
  - Sistema operacional
  - Data/hora de execução
  - Timezone

---

## 🗂️ Estrutura de Arquivos

```
support/
├── hooks.ts          ← Captura screenshots
├── screenshot.ts     ← Utilitário de screenshots
├── context.ts
└── pages/

test-results/
└── screenshots/      ← Screenshots gerados

cucumber-native-report.html  ← Relatório Cucumber nativo
cucumber-custom-report.html  ← Relatório Cucumber custom
cucumber-report.json  ← Dados brutos
```

---

## 🎨 Personalizações Possíveis

### Alterar tema do relatório
Em `generate-report.js`, mude:
```javascript
theme: 'bootstrap'  // ou 'foundation'
```

### Incluir metadata customizada
```javascript
metadata: {
  'Projeto': 'Sauce Labs',
  'Responsável': 'QA Team',
  'Sprint': '2.1'
}
```

### Capturar screenshots a cada N segundos
```typescript
// Em screenshot.ts adicionar:
export async function recordVideo(page: Page, filename: string) {
  // Implement video recording
}
```

---

## 💡 Dicas

1. **Screenshots ocupam espaço**: Limpeza automática remove screenshots com >7 dias
2. **Relatório grande**: Se muitos screenshots, o HTML fica pesado
3. **CI/CD**: Configure `HEADLESS=true` para ambientes de produção
4. **Não abrir relatório**: Mude `launchReport: false` em `generate-report.js`

---

## 🔍 Exemplo de Uso

### Execute um teste específico
```bash
npm run test:cucumber:tag "@001"
```

### Veja o resultado
```bash
npm run test:cucumber:html
```

O navegador abrirá o relatório HTML com todos os screenshots!

---

## 🌐 Visualização Online (GitHub Pages)

Após push na branch `main`, o workflow publica os relatórios em uma página índice no GitHub Pages.

Arquivos publicados:
- `cucumber-native-report.html`
- `cucumber-custom-report.html`
- `cucumber-report.json`
- `playwright-report/` (quando existir)

---

## 📝 Próximos Passos

1. ✅ Adicionar videos dos testes (com ffmpeg)
2. ✅ Integrar com CI/CD (GitHub Actions, GitLab CI)
3. ✅ Enviar relatório para dashboard
4. ✅ Notificações de falhas por email/Slack

---

## ❓ FAQ

**P: Os screenshots deixam os testes lentos?**
R: Não significativamente. Faça em paralelo se necessário.

**P: Posso desabilitar screenshots?**
R: Sim! Comente `AfterStep` em `hooks.ts`

**P: Qual o tamanho máximo do relatório?**
R: Depende dos screenshots. Média: 50-100MB para 10 testes.
