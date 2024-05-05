// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: "netlify-edge",
    output: {
      dir: "dist",
      serverDir: "dist",
    }
  },
  runtimeConfig: {
    pincodeSalt: '',
    authTokenSecret: '',
    storeKeySeparator: '',
  },
})
