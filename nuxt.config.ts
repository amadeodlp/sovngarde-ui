// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'SovnGarde - Game Development Community',
      meta: [
        { name: 'description', content: 'Where game developers share, connect, and grow together' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:3001',
      orgId: process.env.ORG_ID || 'default-org-id'
    }
  },

  css: ['~/assets/css/main.css'],

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },

  compatibilityDate: '2025-04-22'
})