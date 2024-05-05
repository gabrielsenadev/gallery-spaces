// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: "netlify",
    output: {
      dir: "dist",
    },
  },
  runtimeConfig: {
    pincodeSalt: '',
    authTokenSecret: '',
    storeKeySeparator: '',
  },
})
