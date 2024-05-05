// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: "netlify",
  },
  runtimeConfig: {
    passwordSalt: '',
    authTokenSecret: '',
    storeKeySeparator: '',
    netlifySiteId: '',
    netlifyToken: '',
  },
})
