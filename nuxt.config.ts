export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    'vuetify-nuxt-module'
  ],
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY || '',
    public: {
      aiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY)
    }
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#006496',
              secondary: '#3d6a00',
              surface: '#f7f9ff',
              background: '#f7f9ff',
              error: '#ba1a1a',
              info: '#129fea',
              success: '#76b82a',
              warning: '#ffc21c'
            }
          }
        }
      }
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'Gotas del Sinú – Plataforma Educativa Gamificada',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Plataforma educativa interactiva de aprendizaje territorial y ciencias de datos de la cuenca del Río Sinú, Córdoba.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
      ]
    }
  }
})
