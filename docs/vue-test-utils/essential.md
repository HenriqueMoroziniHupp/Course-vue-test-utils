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

Com as importações feitas, iremos escrever nosso primeiro teste, chamaremos a função `test` primeiro argumento será uma string com uma breve descrição do nosso teste, e como segundo argumento, uma função de callback onde escreveremos nosso teste.

Dentro da função de callback, iremos chamar `mount` e passar o nosso componente `TodoApp` como primeiro argumento, essa função retornará uma instância do nosso componente, um VueWrapper. Salvaremos esse resultado dentro de uma variável chamada `wrapper`, este nome é adotado pela comunidade.





