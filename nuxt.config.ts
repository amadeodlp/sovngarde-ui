// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  app: {
    head: {
      title: "SovnGarde - Game Development Community",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
      meta: [
        {
          name: "description",
          content: "Where game developers share, connect, and grow together",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || "",
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
  },

  css: ["~/assets/css/main.css"],

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },

  compatibilityDate: "2025-04-22",
})