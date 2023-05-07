import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Courses",
  description: "Conteúdo Vue.js direto ao ponto",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: sidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

function nav() {
  return [
    { text: 'Home', link: '/' },
  ]
}

function sidebar() {
  return [
    {
      text: 'Vue Test Utils - Essencial',
      collapsed: false,
      items: [
        { text: 'Início', link: '/vue-test-utils/index' },
        { text: 'Introdução ao VTU', link: '/vue-test-utils/essential' }
      ]
    }
  ]
}