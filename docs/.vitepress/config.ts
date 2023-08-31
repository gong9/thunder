import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '3d-engine',
  description: '3d 引擎',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Detailed', link: '/scene' },
    ],

    sidebar: [
      {
        text: '核心',
        items: [
          { text: 'scene', link: '/scene' }
        ],
      },
      {
        text: '控制器',
        items: [
          { text: 'control', link: '/control' }
        ],
      },
      {
        text: '加载器',
        items: [
          { text: '模型加载', link: '/model' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          { text: 'useframe', link: '/use' }
        ],
      },
      {
        text: '工具',
        items: [
          { text: 'move', link: '/' }
        ],
      },
      {
        text: '环境模拟',
        items: [
          { text: '雨雪效果', link: '/environment' }
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anov-team/anov-3d-ecology' },
    ],
  },
})
