import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  head: {
    title: 'blog-frontend',
    htmlAttrs: {
      lang: 'de',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Official Blog' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  buildModules: ['@nuxtjs/strapi'],
  modules: ['@nuxtjs/strapi'],
  strapi: {
    entities: ['pages', 'blogs', 'steps'],
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
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
