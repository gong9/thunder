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
        text: 'core',
        items: [
          { text: 'Scene', link: '/scene' }
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anov-team/anov-3d-ecology' },
    ],
  },
})
