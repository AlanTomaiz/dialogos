---
applyTo: "**"
---

# Instrucoes Globais Obrigatorias

## 1) Execucao de testes
Quando houver necessidade de rodar testes, siga estas regras:

- execute os testes apenas uma vez por conjunto de alteracoes
- salve a saida em um arquivo `.txt` dentro da pasta `tmp/`
- utilize nomes claros no formato: `tmp/test-output-<timestamp>.txt`

Para validacoes posteriores:
- reutilize o arquivo ja gerado
- nao rode os testes novamente se nao houver mudancas no codigo
- so execute os testes de novo se existirem novas alteracoes que impactem a validacao anterior

## 2) Comentarios irrelevantes
Nao escreva comentarios desnecessarios no conteudo final, como por exemplo:
- explicacoes decorativas
- introducoes genericas
- observacoes que nao ajudem a execucao

## 3) Estilo de resposta esperado do Copilot
O Copilot deve responder de forma:
- objetiva
- tecnica
- direta
- sem prolixidade

O Copilot nao deve responder em Markdown, exceto quando for realmente necessario para:
- blocos de codigo
- tabelas tecnicas
- documentacao que dependa de formatacao

## Regra obrigatoria
Sempre deve inicialmente fazer analise, nunca alteracao. Deve apresentar o problema e propor a solucao e assim sugerir ao menos duas opcoes de correcoes.

## Convencoes de organizacao
- Arquivo/configuracao de configuracao devem ser mantidos em `src/config/*`
- Arquivo/configuracao de bibliotecas externas devem ser mantidos em `src/libs/*`
- Arquivo/configuracao de requisicao devem ser mantidos em `src/actions/*.action.ts`
- Arquivo/configuracao de types/interface devem ser mantidos em arquivo `.type.ts` (priorizar `type`)
- Arquivo/configuracao de style devem ser mantidos em `.styles.ts`
