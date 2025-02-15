// https://nuxt.com/docs/api/configuration/nuxt-config
import { extractorSplit } from '@unocss/core'
import extractorPug from '@unocss/extractor-pug'
import variantGroup from '@unocss/transformer-variant-group'
import directives from '@unocss/transformer-directives'

export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    shim: false,
    typeCheck: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@nuxt/icon',
    'nuxt-swiper',
    'nuxt-auth-utils',
  ],
  runtimeConfig: {
    public: {
      api: process.env.API,
    },
  },
  piniaPluginPersistedstate: { storage: 'localStorage' },
  stylelint: { lintOnStart: false },
  css: ['the-new-css-reset/css/reset.css', '@/assets/global.styl'],
  i18n: {
    strategy: 'no_prefix',
    restructureDir: '',
    locales: ['en', 'zh-Hant'],
    defaultLocale: 'en',
  },
  unocss: {
    attributify: true,
    icons: true,
    components: false,
    extractors: [
      extractorSplit,
      extractorPug(),
    ],
    transformers: [variantGroup(), directives()]
  },

  elementPlus: { themes: ['dark'] },
  compatibilityDate: '2024-12-28',
})