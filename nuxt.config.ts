// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  buildDir: 'dist',
  devtools: { enabled: true },
  nitro: {
    preset: "netlify",
  }
})
