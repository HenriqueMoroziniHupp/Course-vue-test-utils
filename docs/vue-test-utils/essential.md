# Introdução ao Vue Test Utils

Vamos aprender o básico de Vue Test Util e Vitest ao desenvolver um aplicativo de lista de tarefas.

Ao finalizar essa secção você irá aprender:
- Montar um componente
- Encontrar elementos do componente
- Preencher formulário
- Acionar eventos 

## Inicio

Vamos iniciar com um componente `TodoApp.vue`, com apenas uma tarefa na lista, sem renderizar nada em tela:

```vue
<script lang="ts" setup>
import { ref } from "vue";

const todos = ref([
  {
    id: 1,
    text: "Aprender Vue Test Utils",
    completed: false,
  },
]);

</script>

<template>
  <h1>Minhas Tarefas</h1>
</template>

```

## O primeiro teste - Renderização de uma tarefa
Nosso primeiro teste será para verificar se uma tarefa foi renderizada na DOM. Primeiro vamos ver o teste e depois analisar por parte para aprender os  conceitos iniciais.

```ts:line-numbers
import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoApp from "../TodoApp.vue";

test('renders a todo', () => {
  const wrapper = mount(TodoApp)
  const todo = wrapper.get('[data-test="todo"]')

  expect(todo.text()).toContain('Aprender Vue Test Utils')
})

```


Primeiro precisamos fazer algumas importações:

- `mount`: Função do VTU para criar uma instância do nosso componente Vue.
- `test` e `expect`: São funções do Vitest, onde `test` sera usada para declararmos nosso teste e `expect` para dizermos o que esperamos do nosso teste.
- Por fim, nosso componente, nesse caso estamos importando o componente `TodoApp.vue` da secção [inicio](#inicio)

Com as importações feitas, vamos escrever nosso primeiro teste. Para isso chamamos a função `test`, que recebe dois argumentos: O primeiro, uma string com uma pequena descrição do nosso teste, e o segundo, uma função de callback onde nosso teste será escrito.

Para testar um componente devemos monta-lo, então dentro da função de callback vamos chamar `mount` e passar como argumento o nosso `TodoApp`, essa função retornará uma instância do nosso componente, um VueWrapper. Salvaremos esse resultado dentro de uma variável chamada `wrapper`, que é um nome é adotado pela comunidade.

Com o componente montado teremos acesso a vários métodos.

Agora com o `wrapper`, precisamos selecionar um elemento que queremos testar, para isso utilizaremos o método `get`.
Este método funciona de forma parecida ao *querySelector* do JavaScript. No exemplo utilizamos uma atributo chamado `[data-test="todo"]` para localizar o elemento na DOM.

Até aqui temos selecionado o elemento que queremos testar. Em seguida vamos utilizar a função `expect` do Vitest,
que nada mais é uma função que espera alguma resposta.

Quero verificar se minha tarefa é renderizado com o texto que foi declarado no objeto, então esperamos que o elemento selecionado tenha um texto que contenha `"Aprender Vue Test Utils"`. 

O texto é obtido por `text()`, e utilizamos `toContain()` para dizer o que queremos que a seleção contenha.

Agora basta executar com o comando: `npm run test:unit`.

No terminal é exibido um erro bem intuitivo:

```bash
Error: Unable to get [data-test="todo"] 
```


Nosso teste falhou por motivos óbvio, não temos nada em nosso template com atributo `[data-test="todo"]`, isso significa que o método `get()` falhou ao retornar um elemento pertencente a `wrapper` que satisfaça esta condição. Não temos nenhum item de nossa lista de tarefas sendo renderizada na DOM, a não ser o título "Minhas Tarefas".

Como sabemos o que queremos, então fica fácil realizar a implementação do nosso componente.

## Fazendo o teste passar

Para fazer nosso teste passar, precisamos ter no template um elemento que seja compatível com o atributo, então devemos renderizar algum elemento com o nome da nossa tarefa, que é "Aprender Vue Test Utils".


Para que nosso teste passe, precisamos que no template tenha alguma elemento com o atributo `[data-test="todo"]`, fazendo com que o `get()` encontre algo, e que este elemento contenha "Aprender Vue Test Utils".


Pronto, temos nosso primeiro teste concluído ! :tada:
