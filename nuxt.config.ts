// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  modules: ['@nuxtjs/strapi', '@pinia/nuxt', '@nuxtjs/color-mode'],
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  typescript: {
    strict: true,
  },
  vite: {
    // @ts-ignore ssr:
    noExternal: ['moment'],
  },

  devtools: { enabled: true }
})
