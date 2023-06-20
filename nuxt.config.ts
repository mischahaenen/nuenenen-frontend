// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],
  plugins: [],
  components: true,
  modules: [
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
  ],
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
  image: {},
  nitro: {
    compressPublicAssets: true,
  },
  devtools: { enabled: true }
})
