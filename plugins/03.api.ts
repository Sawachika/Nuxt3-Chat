import { ofetch, type FetchOptions } from 'ofetch'
export default defineNuxtPlugin(() => {
  const { $toast } = useNuxtApp()
  const config = useRuntimeConfig()

  const fetch = ofetch.create({
    onRequest({ options }) {
      if (import.meta.server) options.baseURL = config.public.api
      options.headers = options.headers || {}
      options.credentials = 'include'
    },
    async onResponse({ response }) {
      if (response.status !== 200) $toast.error('Please try again later')
    },
  })
  const api = async <T>(url: string, options?: FetchOptions<'json'>): Promise<[T | null, Error | null]> => {
    try {
      const res = await fetch<{ data: T }>(url, options)
      return [res.data, null]
    } catch (error) {
      return [null, error instanceof Error ? error : new Error(String(error))]
    }
  }

  return {
    provide: { api },
  }
})
