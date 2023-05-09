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

Com as importações feitas, vamos escrever nosso primeiro teste. Para isso chamamos a função `test`, que recebe dois argumentos: O primeiro, uma string com uma pequena descrição do nosso teste, e o segundo, uma função de callback onde escreveremos de fato o nosso teste.

Para testar um componente devemos monta-lo, então dentro da função de callback vamos chamar `mount` e passar como argumento o nosso `TodoApp`, essa função retornará uma instância do nosso componente, um VueWrapper. Salvaremos esse resultado dentro de uma variável chamada `wrapper`, que é um nome é adotado pela comunidade.

Com o componente montado teremos acesso a vários métodos.

Agora com o `wrapper`, precisamos selecionar um elemento que queremos testar, para isso utilizaremos o método `get`.
Este método funciona de forma parecida ao *querySelector* do JavaScript. No exemplo utilizamos uma atributo chamado `[data-test="todo"]` para localizar o elemento na DOM.

Até aqui temos selecionado o elemento que queremos testar. Em seguida vamos utilizar a função `expect` do Vitest,
que nada mais é uma função que espera alguma resposta.

Quero verificar se minha tarefa é renderizada com o texto que foi declarado no objeto, então esperamos que o elemento selecionado tenha um texto que contenha `"Aprender Vue Test Utils"`. 

O texto é obtido por `text()`, e utilizamos `toContain()` para dizer o que queremos que a seleção contenha.

Agora basta executar com o comando: `npm run test:unit`.

No terminal é exibido um erro bem intuitivo:

```bash
Error: Unable to get [data-test="todo"] 
```


Nosso teste falhou por motivos óbvio, não temos nada em nosso template com atributo `[data-test="todo"]`, isso significa que o método `get()` falhou ao retornar um elemento pertencente a `wrapper` que satisfaça esta condição. Não temos nenhum item de nossa lista de tarefas sendo renderizada na DOM, a não ser o título "Minhas Tarefas".

Como sabemos o que queremos, então fica fácil realizar a implementação do nosso componente.

## Fazendo o teste passar

Para que nosso teste passe, precisamos que no template tenha alguma elemento com o atributo `[data-test="todo"]`, fazendo com que o `get()` encontre algo, e que este elemento contenha "Aprender Vue Test Utils".

```vue
<template>
  <h1>Minhas Tarefas</h1>
  <li
    v-for="todo in todos"
    :key="todo.id"
    data-test="todo"
  >
    {{ todo.text }}
  </li>
</template>
```

Executando novamente o Vitest ...
Pronto, temos nosso primeiro teste concluído ! :tada:


## Adicionando uma nova tarefa

Nosso próximo passo é adicionar uma funcionalidade para o usuário criar uma nova tarefa.
Para isso precisamos de um formulário com um `input` onde o usuário irá inserir a descrição da sua tarefa,
depois teremos que realizar um `submit` para ela ser criada.

Ao adicionar esta nova tarefa, nossa lista renderizada na DOM passará de uma tarefa para duas tarefas, então vamos testar se nossa lista aumenta
após a inserção do novo item.


```ts
test('add a new todo', () => {
  const wrapper = mount(TodoApp)
  expect(wrapper.findAll('[data-test="todo"')).toHaveLength(1)

  wrapper.get('[data-test="form-input"]').setValue('New todo')
  wrapper.get('[data-test="form"').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"')).toHaveLength(1)
})
```

Seguindo a mesma lógica do teste anterior, primeiro montaremos nosso componente com `mount` , salvaremos nosso `wrapper` e esperamos que nossa lista tenha tamanho igual a 1.
Pare termos acesso ao tamanho de nossa lista, precisamos do método [`findAll`](https://test-utils.vuejs.org/api/#findall)
que retorna uma matriz com elementos correspondentes da DOM seguindo de [`toHaveLength(1)`](https://vitest.dev/api/expect.html#tohavelength)

Agora precisamos simular uma ação do usuário que neste exemplo é escrever um texto no campo de entrada, vamos realizar esta ação com `setValue()`.

Para simular o envio do formulário, clique no botão enviar, iremos utilizar o método `trigger()`

Após preencher o formulário e envia-lo, esperamos que o novo tamanho de nossa lista de tarefa seja dois.
Então seguiremos o primeiro `exprect` porém com `toHaveLength(2)`

Agora vamos para o componente realizar nossa implementação.

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

const newTodo = ref<string>('')
function createTodo() {
  todos.value.push({
    id: todos.value.length + 1,
    text: newTodo.value,
    completed: false,
  });
}

</script>

<template>
  <h1>Minhas Tarefas</h1>
  <li
    v-for="todo in todos"
    :key="todo.id"
    data-test="todo"
  >
    {{ todo.text }}
  </li>

  <form data-test="form" @submit.prevent="createTodo" >
    <label>Nova tarefa</label>
    <input v-model="newTodo" data-test="form-input" />
  </form>
</template>
```

Usamos `v-model` para vincular `newTodo` com `<input>` e `@submit` para ouvir e chamar `createTodo()`, inserindo um novo objeto em `todos`

Se rodarmos nosso projeto, tudo funcionará normalmente, porém o teste ira falhar.

O teste falha pois o Vitest executa os testes de forma síncrona, enquanto o Vue atualiza a DOM de forma assíncrona. 
Precisamos marcar nosso teste como `async` e chamar um `await` em todos métodos que possam fazer com que a DOM mude,
no nosso caso o `setValue` no input e o `trigger` no nosso form.

```ts{1,5-6}
test('add a new todo', async () => {  // [!code focus]
  const wrapper = mount(TodoApp)
  expect(wrapper.findAll('[data-test="todo"')).toHaveLength(1)

  await wrapper.get('[data-test="form-input"]').setValue('New todo')  // [!code focus]
  await wrapper.get('[data-test="form"').trigger('submit')  // [!code focus]

  expect(wrapper.findAll('[data-test="todo"')).toHaveLength(1)
})
```

Agora ao executar nosso teste, irá passar ! :tada: