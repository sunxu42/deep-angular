import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Angular 最佳实践",
  description: "提供Angular开发各类最佳实践的指南",
  base: "/deep-angular/",
  head: [['link', { rel: 'icon', href: './angular.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: '🧩Component', link: '/component' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    container: {
      tipLabel: '🍀&nbsp;&nbsp;提示',
      infoLabel: '🌰&nbsp;&nbsp;示例',
      warningLabel: '⚠️&nbsp;&nbsp;警告',
      dangerLabel: '❌&nbsp;&nbsp;危险',
      detailsLabel: '🔍&nbsp;&nbsp;详情'
    }
  }
})
