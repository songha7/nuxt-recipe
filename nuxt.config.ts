// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-11',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon-tw',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'shadcn-nuxt'
  ],
  googleFonts: {
    families: {
      Montserrat: true,
    },
  },

  image: {
    domains: ['https://cdn.dummyjson.com']
  },

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  }
});