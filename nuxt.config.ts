// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/main.scss'],
  plugins: [],
  components: true,
  modules: [
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'vue3-carousel-nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    '@nuxt/content',
    'nuxt-gtag',
  ],

  strapi: {
    url: process.env.STRAPI_URL,
    prefix: '',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt',
  },

  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL ?? 'http://localhost:1337/api',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  typescript: {
    strict: true,
  },

  vite: {
    // @ts-ignore ssr:
    noExternal: ['moment'],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/utils.scss" as *;',
        },
      },
    },
  },

  image: {
    dir: 'assets/',
    formats: ['webp', 'svg', 'png', 'jpg'],
    strapi: {
      baseURL:
        'https://nuenenen-strapi-aws-s3-images-bucket.s3.eu-central-1.amazonaws.com/',
    },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  googleFonts: {
    families: {
      Lato: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Orbitron: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },

  compatibilityDate: '2025-01-08',
})
