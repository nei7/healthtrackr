// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    'nuxt-mongoose',
    '@pinia/colada-nuxt',
    '@pinia/nuxt',
    'nuxt-charts'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',
  nitro: {
    experimental: {
      tasks: true
    },

    scheduledTasks: {
      '0 */6 * * *': ['fetchWhoopData'],
      '0 12 * * *': ['fetchHeartRate']
    }
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    devtools: true
  }

})
