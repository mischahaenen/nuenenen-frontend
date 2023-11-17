import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey:
      process.env.RECAPTCHA_SITE_KEY ||
      '6Ld0QeYmAAAAAD1IoaQHoqvU7ucRUOwDEn_C0zaA',
    loaderOptions: {
      autoHideBadge: true,
      explicitRenderParameters: {
        badge: 'bottomright',
      },
    },
  })
})
