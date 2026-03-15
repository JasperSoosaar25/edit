import { fileURLToPath } from 'node:url'
import consola from 'consola'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import OptimizeExclude from 'vite-plugin-optimize-exclude'
import Terminal from 'vite-plugin-terminal'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitepress'

import {
  commitRef,
  feedback,
  meta,
  nav,
  search,
  sidebar,
  socialLinks
} from './constants'

import { generateFeed, generateImages, generateMeta } from './hooks'
import { defs, emojiRender, movePlugin } from './markdown/emoji'
import { headersPlugin } from './markdown/headers'
import { toggleStarredPlugin } from './markdown/toggleStarred'
import { transformsPlugin } from './transformer'
import { replaceNoteLink } from './utils/markdown'

// @unocss-include
const baseUrl = process.env.GITHUB_ACTIONS ? '/edit' : '/'

export default defineConfig({
  title: "MyFMHY",
  description: "My personal free media & tools collection :3",
  titleTemplate: ':title • MyFMHY ;3',
  lang: 'en-US',
  lastUpdated: false,
  cleanUrls: true,
  appearance: true,
  base: baseUrl,
  srcExclude: ['README.md', 'single-page'],
  ignoreDeadLinks: true,

  sitemap: {
    hostname: meta.hostname
  },

  head: [
    ['meta', { name: 'theme-color', content: '#ff9ede' }], // cute pink theme
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['link', { rel: 'icon', href: '/test.png' }],
    // PWA
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'icon', href: '/pwa_icon.png', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/pwa_icon.png' }],
    ['link', { rel: 'mask-icon', href: '/pwa_icon.png', color: '#ff9ede' }],
    ['meta', { name: 'keywords', content: meta.keywords.join(' ') }],
    ['link', { rel: 'apple-touch-icon', href: '/pwa_icon.png', sizes: '192x192' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
  ],

  transformHead: async (context) => generateMeta(context, meta.hostname),

  buildEnd: async (context) => {
    generateImages(context)
      .then(() => generateFeed(context))
      .finally(() => consola.success('Success! nya~ :3'))
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    ssr: {
      noExternal: ['@fmhy/components']
    },
    resolve: {
      alias: [
        {
          find: /^.*VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/ThemeDropdown.vue', import.meta.url))
        },
        {
          find: /^.*VPLocalSearchBox\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPLocalSearchBox.vue', import.meta.url))
        },
        {
          find: /^.*VPNav\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPNav.vue', import.meta.url))
        }
      ]
    },
    optimizeDeps: { exclude: ['workbox-window'] },
    plugins: [
      OptimizeExclude(),
      Terminal({
        console: 'terminal',
        output: ['console', 'terminal']
      }),
      UnoCSS({
        configFile: fileURLToPath(new URL('../../unocss.config.ts', import.meta.url))
      }),
      AutoImport({
        dts: '../.cache/imports.d.ts',
        imports: ['vue', 'vitepress'],
        vueTemplate: true,
        biomelintrc: {
          enabled: true,
          filepath: './.cache/imports.json'
        }
      }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: { statuses: [0, 200] }
              }
            }
          ]
        },
        manifest: {
          name: 'MyFMHY :3',
          short_name: 'MyFMHY',
          description: 'Your own super cute free media & tools collection ;3',
          theme_color: '#ff9ede',
          background_color: '#1a1a2e',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            { src: '/test.png', sizes: '16x16', type: 'image/x-icon' },
            { src: '/pwa_icon.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
            { src: '/pwa_icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
          ]
        }
      }),
      transformsPlugin(),
      {
        name: 'custom:adjust-order',
        configResolved(c) {
          movePlugin(c.plugins as any, 'vitepress', 'before', 'unocss:transformers:pre')
          movePlugin(c.plugins as any, 'custom:transform-content', 'before', 'vitepress')
        }
      }
    ],
    build: {
      chunkSizeWarningLimit: Number.POSITIVE_INFINITY
    }
  },

  markdown: {
    emoji: { defs },
    config(md) {
      md.use(emojiRender)
      md.use(toggleStarredPlugin)
      meta.build.api && md.use(headersPlugin)
      replaceNoteLink(md)
    }
  },

  themeConfig: {
    search,
    footer: {
      message: `${feedback} (rev: ${commitRef}) nya~`,
      copyright:
        `© ${new Date().getFullYear()}, <a href="https://i.ibb.co/VJQmQ9t/image.png">Estd 2018.</a><br/>` +
        `This site does not host any files :3`
    },
    editLink: {
      pattern: 'https://github.com/JasperSoosaar25/edit/edit/main/docs/:path',
      text: '📝 Edit this page ;3'
    },
    outline: 'deep',
    logo: {
      src: '/test.png',
      alt: 'MyFMHY :3'
    },
    nav,
    sidebar,
    socialLinks
  }
})
