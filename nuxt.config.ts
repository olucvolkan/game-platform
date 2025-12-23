// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
    display: 'swap',
  },

  app: {
    head: {
      title: 'Eneba - Game Marketplace',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Buy games, gift cards, and more at the best prices' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },
})
