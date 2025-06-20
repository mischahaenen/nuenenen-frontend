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
    treeshakeClientOnly: true,
  },
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
      '/': { prerender: true },
      '/static/**': {
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
      },
      '/assets/**': {
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
      },
    },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
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
    formats: ['avif', 'webp', 'jpg', 'png'],
    quality: 85,
    densities: [1, 2],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 50,
          height: 50,
        },
      },
      banner: {
        modifiers: {
          format: 'webp',
          width: 1920,
          height: 600,
          quality: 90,
        },
      },
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
      Lato: [300, 400, 500, 700],
      Orbitron: [400, 500, 700],
    },
    display: 'swap',
    preconnect: true,
    prefetch: true,
    download: true,
    inject: true,
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'dns-prefetch',
          href: '//nuenenen-strapi-aws-s3-images-bucket.s3.eu-central-1.amazonaws.com',
        },
      ],
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
