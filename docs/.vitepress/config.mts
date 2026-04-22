import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { sidebar, nav } from './sidebar.mts'

export default withMermaid(
  defineConfig({
    title: 'ITKdev Research',
    description: 'Research projects from ITKdev',

    base: '/research-projects/',
    lang: 'da-DK',
    srcDir: '.',
    outDir: '../_site',
    cleanUrls: true,

    head: [
      ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ],

    vite: {
      server: {
        allowedHosts: true,
      },
    },

    lastUpdated: true,

    themeConfig: {
      nav: nav(),
      sidebar: sidebar(),

      lastUpdated: {
        formatOptions: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          forceLocale: true,
        },
      },

      search: {
        provider: 'local',
      },

      editLink: {
        pattern: 'https://github.com/itk-dev/research-projects/tree/main/docs/:path',
        text: 'View source on Github',
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/itk-dev/research-projects' },
      ],
    },
  }),
)
