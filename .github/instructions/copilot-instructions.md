---
applyTo: "**"
---

# Dialogos — Instruções do Repositório

## Regras de Conduta Geral

- Nenhum arquivo, pasta, componente, função ou dependência deve ser criado, alterado, movido, renomeado ou removido sem comando explícito do responsável pelo projeto.
- Sugestões de refatoração só devem ser executadas após aprovação explícita.
- Toda geração de código deve seguir os padrões definidos neste arquivo sem exceção.

---

## Padrões de Código

### Clean Code

- Funções e métodos devem ter responsabilidade única e ser curtos o suficiente para serem compreendidos sem comentários explicativos.
- Nomes de arquivos, funções, variáveis e componentes devem ser descritivos, sem abreviações desnecessárias.
- Condicionais complexas devem ser extraídas para funções ou variáveis nomeadas.
- Lógica de negócio não deve residir em componentes visuais; deve ser isolada em hooks, serviços ou utilitários.
- Comentários são reservados para decisões não óbvias; nunca para descrever o que o código já expressa.

### TypeScript

- Tipagem explícita é obrigatória em parâmetros de funções exportadas e retornos de hooks.
- Evitar `any`; usar tipos específicos ou `unknown` com narrowing.
- Prefira utilizar tipos (`type`) para modelar dados, especialmente para respostas de APIs e props de componentes.

---

## Arquitetura e Estrutura de Pastas

A estrutura abaixo é o padrão do projeto. Nenhuma pasta de primeiro nível dentro de `src/` deve ser criada sem justificativa e aprovação.

```
src/
  components/     # Componentes reutilizáveis de UI, sem lógica de negócio
  config/         # Constantes globais e configurações da aplicação
  hooks/          # Custom hooks: isolamento de lógica com estado
  libs/           # Inicialização e configuração de bibliotecas externas
  screens/        # Telas/páginas da aplicação
  services/       # Integrações com APIs e fontes de dados externas
  theme/          # Design system central (não editar sem aprovação)
  utils/          # Funções puras auxiliares, sem efeitos colaterais
```

### Responsabilidades por Pasta

| Pasta | Responsabilidade |
|---|---|
| `components/` | Componentes visuais reutilizáveis. Recebem dados via props. Não fazem chamadas a APIs nem acessam estado global diretamente. |
| `config/` | Constantes de ambiente, chaves de configuração, enumerações globais e valores fixos da aplicação. |
| `hooks/` | Encapsulamento de lógica com estado ou efeitos. Não renderizam JSX. |
| `libs/` | Configuração inicial de qualquer biblioteca externa (ex: cliente HTTP, analytics, armazenamento). O restante do código importa a instância configurada daqui. |
| `screens/` | Composição de componentes que formam uma tela. Coordenam hooks e exibem dados; não contêm lógica de negócio inline. Cada tela reside em sua própria pasta (`src/screens/<Name>/`) com os arquivos `index.tsx` e `style.ts`. |
| `services/` | Funções que se comunicam com APIs externas ou fontes de dados. Não contêm lógica de UI. |
| `theme/` | Fonte única de verdade para cores, tipografia, espaçamento, bordas e sombras. |
| `utils/` | Funções auxiliares puras e reutilizáveis, sem dependência de estado ou contexto. |

---

## Tema e Estilo

- O arquivo `src/theme/index.ts` é a base de todo o sistema visual do projeto.
- Cores, tipografia, espaçamentos, bordas, sombras e z-indexes devem ser consumidos exclusivamente a partir do tema; valores hardcoded de estilo são proibidos.
- Cada tela e componente que exige estilo deve ter um arquivo `style.ts` colocado no mesmo diretório do componente ou tela correspondente.
- O arquivo `style.ts` deve usar `StyleSheet.create` e referenciar os tokens do tema.
- Estilos inline em JSX são permitidos apenas para valores dinâmicos que dependem de estado ou props em tempo de execução.

### Estrutura de Screens

Cada tela deve ter sua própria pasta dentro de `src/screens/`, seguindo o formato:

```
src/screens/<Name>/
  index.tsx    # Componente da tela
  style.ts     # Estilos da tela
```

Exemplo:

```
src/screens/Home/
  index.tsx
  style.ts
```

---

## Bibliotecas Externas

- Toda biblioteca externa deve ter sua inicialização centralizada em `src/libs/`.
- O restante da aplicação importa a instância ou função configurada de `src/libs/`, nunca diretamente da biblioteca.
- Isso garante que a substituição de uma dependência impacte apenas o arquivo em `src/libs/`.
- Dependências novas só devem ser adicionadas ao `package.json` com aprovação explícita.

---

## Separação de Responsabilidades

- **UI**: `components/` e `screens/`. Renderização e interação do usuário.
- **Lógica com estado**: `hooks/`. Estado local, efeitos e derivações.
- **Regra de negócio**: `services/` e `utils/`. Transformações de dados, validações e chamadas externas.
- **Configuração**: `config/` e `libs/`. Constantes, inicializações e configurações de ambiente.
- **Estilo e identidade visual**: `theme/` e arquivos `style.ts`.

Nenhuma dessas camadas deve ser misturada. Um componente visual não deve conter chamadas de API. Um serviço não deve importar componentes.

---

## Nomenclatura

- Componentes React: `PascalCase` (ex: `MessageCard`, `UserAvatar`).
- Hooks: prefixo `use` + `PascalCase` (ex: `useAuthSession`, `useMessageList`).
- Funções utilitárias: `camelCase` descritivo (ex: `formatRelativeDate`, `parseApiError`).
- Constantes globais: `UPPER_SNAKE_CASE` (ex: `MAX_RETRY_COUNT`, `API_BASE_URL`).
- Pastas de telas: `PascalCase` simples, sem sufixo `Screen` (ex: `src/screens/Login/`, `src/screens/Home/`). O arquivo principal da tela deve ser `index.tsx` e o de estilos `style.ts`.
- Arquivos de componentes: `PascalCase` (ex: `MessageCard.tsx`, `UserAvatar.tsx`).
- Arquivos de hooks, serviços e utilitários: `camelCase` (ex: `useAuthSession.ts`, `messageService.ts`).
- Arquivos de estilo: sempre `style.ts`, colocalizados com o componente ou tela.

---

## Escalabilidade e Manutenção

- Cada módulo deve ser substituível de forma independente; acoplamento entre pastas deve ser mínimo e explícito.
- Importações circulares são proibidas.
- Lógica que se repete em dois ou mais lugares deve ser extraída para `utils/` ou `hooks/` antes de uma terceira repetição.
- Configurações que variam por ambiente (desenvolvimento, produção) devem estar em `src/config/`, nunca espalhadas pelo código.
