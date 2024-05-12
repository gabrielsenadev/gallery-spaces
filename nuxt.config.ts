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
      title: 'Gallery Spaces - Create your own gallery and share',
      charset: 'utf-8',
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