# 🧪 Guia de Testes

Este documento descreve a estratégia de testes, organização das suites, padrões adotados e como contribuir com novos cenários neste projeto E2E web.

---

## 📋 Índice

- [Estratégia de Testes](#-estratégia-de-testes)
- [Organização das Suites](#-organização-das-suites)
- [Cobertura de Testes](#-cobertura-de-testes)
- [Padrões e Convenções](#-padrões-e-convenções)
- [Como Executar](#️-como-executar)
- [Como Adicionar Novos Testes](#-como-adicionar-novos-testes)
- [Boas Práticas](#-boas-práticas)
- [Relatórios](#-relatórios)

---

## 🎯 Estratégia de Testes

O projeto adota uma abordagem de testes E2E focada em fluxos críticos da experiência do usuário.

### Tipos de Cenários

1. **Testes Positivos** (`@positivo`)
   - Validam fluxos esperados (login, navegação, checkout)
   - Confirmam comportamento correto da UI

2. **Testes Negativos** (`@negativo`)
   - Validam mensagens de erro e bloqueios de acesso
   - Confirmam tratamento de credenciais inválidas

### Níveis de Teste

| Nível | Descrição | O que valida |
|-------|-----------|--------------|
| **UI Funcional** | Fluxo da aplicação | Navegação, ações de usuário, estados visíveis |
| **Validação de Interface** | Elementos da página | Campos, botões, mensagens e textos |
| **E2E de Negócio** | Jornada ponta a ponta | Login → Produtos → Carrinho → Checkout |

---

## 📂 Organização das Suites

```text
features/
├── 01-Login.feature
├── 02-Produtos.feature
├── 03-Cart.feature
└── step_definitions/
    ├── login/
    ├── produtos/
    └── cart/
```

### Nomenclatura de Arquivos

- Padrão para features: `NN-Nome.feature`
- Exemplos: `01-Login.feature`, `02-Produtos.feature`, `03-Cart.feature`

---

## ✅ Cobertura de Testes

O projeto cobre os principais fluxos do SauceDemo:

### 🔐 Login
- Validação dos elementos da página
- Login com usuário válido
- Login com senha inválida
- Login com usuário bloqueado
- Tentativa sem preenchimento de campos

### 🛍 Produtos
- Carregamento da listagem de produtos
- Navegação para detalhes
- Voltar para lista
- Validação de preço

### 🛒 Carrinho e Checkout
- Adicionar/remover produtos com validação de badge
- Navegar para carrinho e continuar comprando
- Fluxo completo de checkout com validação de mensagem de sucesso

---

## 🏷️ Padrões e Convenções

### Sistema de Tags

Os cenários usam múltiplas tags para permitir filtros flexíveis.

Exemplo real:

```gherkin
@003-003 @smoke @positivo @e2e
Cenário: Completar fluxo de checkout com sucesso
```

#### Estrutura de Tags

1. **ID Único**: `@001-001`, `@002-003`, `@003-002`
2. **Domínio**: `@login`, `@produtos`, `@cart`
3. **Tipo**: `@positivo`, `@negativo`
4. **Execução**: `@smoke`, `@regressao`, `@e2e`

### Nomenclatura de Cenários

**Formato recomendado**: Ação + Contexto + Resultado Esperado

- ✅ `Realizar login com usuário padrão com sucesso`
- ✅ `Completar fluxo de checkout com sucesso`
- ❌ `Teste login`
- ❌ `Cenário 1`

---

## ▶️ Como Executar

### Executar todos os testes Cucumber

```bash
npm run test:cucumber
```

### Executar por tag

```bash
# Apenas smoke
npm run test:cucumber:tag -- "@smoke"

# Apenas regressão
npm run test:cucumber:tag -- "@regressao"

# Apenas cenários negativos de login
npm run test:cucumber:tag -- "@login and @negativo"
```

### Gerar relatório customizado

```bash
npm run report
```

### Execução com variáveis de ambiente

```bash
HEADLESS=false npm run test:cucumber
SLOWMO=1000 npm run test:cucumber
```

---

## ➕ Como Adicionar Novos Testes

### 1. Identificar a suite correta

- `01-Login.feature` → autenticação
- `02-Produtos.feature` → catálogo e detalhes
- `03-Cart.feature` → carrinho e checkout

### 2. Criar cenário na feature

- Defina tags coerentes
- Escreva passos em linguagem de negócio

### 3. Implementar/estender step definitions

- Reutilize steps existentes quando possível
- Evite duplicação de lógica

### 4. Reutilizar Page Objects

- Encapsule seletores em `*Elements.ts`
- Encapsule ações em `*Actions.ts`

### 5. Validar o cenário completo

- Valide comportamento final esperado
- Verifique mensagens/elementos relevantes

---

## 💡 Boas Práticas

### ✅ DO (Faça)

1. Reutilize Actions e Elements existentes
2. Mantenha cenários curtos e objetivos
3. Use tags de forma consistente
4. Nomeie cenários em português com clareza
5. Garanta isolamento entre cenários

### ❌ DON'T (Não faça)

1. Duplicar seletores diretamente nos steps
2. Criar steps genéricos sem contexto
3. Omitir validações importantes após ações críticas
4. Acoplar cenário ao resultado de cenário anterior
5. Usar nomes vagos para cenários

---

## 📊 Relatórios

### Geração local

```bash
npm run test:cucumber
npm run report
```

Saídas:
- `cucumber-custom-report.html`
- `cucumber-report.json`
- `test-results/screenshots/`

### Visualização online

Relatório publicado automaticamente em:
- https://rftrombeta.github.io/playwright-cucumber-e2e-testing/

### Workflow

Publicação feita pelo workflow:
- [.github/workflows/e2e-reports.yml](.github/workflows/e2e-reports.yml)

---

**Dúvidas?** Abra uma issue no repositório ou consulte o [README.md](README.md).
