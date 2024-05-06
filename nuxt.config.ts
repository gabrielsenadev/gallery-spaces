// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: "netlify",
  },

  image: {
    provider: 'netlify',
  },

  runtimeConfig: {
    passwordSalt: '',
    authTokenSecret: '',
    storeKeySeparator: '',
    netlifySiteId: '',
    netlifyToken: '',
  },

  app: {
    head: {
      bodyAttrs: {
        class: 'h-full',
      },
      htmlAttrs: {
        class: 'h-full',
      },
    },
    rootTag: 'body',
  },

  postcss: {
    plugins: {
      cssnano: process.env.NODE_ENV === 'production'
      ? { preset: ['default', { discardComments: { removeAll: true } }] }
      : false,
    },
  },

  modules: ['@nuxtjs/tailwindcss', ['@nuxtjs/google-fonts', {
    families: {
      Inter: [400, 600, 700],
    },
}], "@nuxt/image"],
})