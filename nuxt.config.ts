// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  buildModules: ['@nuxtjs/strapi', '@pinia/nuxt'],
  modules: ['@nuxtjs/strapi'],
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
})
