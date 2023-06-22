// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    github: {
      clientId: "",
      clientSecret: "",
    },
  },
  css: ["~/assets/css/main.scss"],
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
});

