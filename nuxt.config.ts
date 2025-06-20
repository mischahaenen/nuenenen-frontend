// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css: ['@/assets/css/main.scss'],
  modules: [
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    '@nuxt/content',
    'nuxt-gtag',
  ],
  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL ?? 'http://localhost:1337/api',
    },
  },
  imports: {
    autoImport: true,
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: process.env.ANALYZE === 'true',
  },
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        },
      },
    },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      rollupOptions: {},
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/utils.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'date-fns', '@vueuse/core'],
      exclude: ['vue-demi'],
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
  gtag: {
    id: process.env.GTAG_ID || 'G-F1TXT7Y96H',
    config: {
      page_title: 'Pfadi Nünenen',
      page_location: 'https://pfadi-nuenenen.ch',
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: false,
      cookie_flags: 'SameSite=Strict;Secure',
      custom_map: {
        dimension1: 'page_type',
        dimension2: 'user_type',
        dimension3: 'device_type',
        dimension4: 'content_category',
        dimension5: 'user_journey_stage',
      },
    },
  },
})
