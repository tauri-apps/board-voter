// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src',
  telemetry: false,
  app: {
    baseURL: '/board-voter/'
  },
  devtools: { enabled: false }
})
