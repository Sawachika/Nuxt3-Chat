import type { Pinia } from 'pinia'
type ApiFunction = ReturnType<typeof useNuxtApp>['$api']

export default defineNuxtPlugin(nuxtApp => {
  const pinia = nuxtApp.$pinia as Pinia
  const api = nuxtApp.$api as ApiFunction
  pinia.use(() => ({ $api: api }))
})
