import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AprendaVue",
  description: "Aprenda Vue",
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
    { text: 'Examples', link: '/markdown-examples' }
  ]
}

function sidebar() {
  return [
    {
      text: 'Vue Test Utils - Essencial',
      collapsed: false,
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' },
        { text: 'Início', link: '/vue-test-utils/index' }
      ]
    }
  ]
}