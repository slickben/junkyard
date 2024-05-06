// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-headlessui"
  ],
  headlessui: {
    prefix: 'Head'
  },
  auth: {
    globalAppMiddleware: true,
    baseURL: `${process.env.api}/`,
    provider: {
        type: 'local',
        endpoints: {
          signIn: { path: 'auth/login', method: 'post' },
          signOut: { path: 'auth/logout', method: 'post' },
          signUp: { path: 'auth/register', method: 'post' },
          getSession: { path: 'users/me', method: 'get' },
          // refresh: { path: '/refresh-token', method: 'post' }
        },
        token: { signInResponseTokenPointer: '/accessToken' },
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: ''
    }
  },
})