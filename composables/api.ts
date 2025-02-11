import type { UseFetchOptions } from 'nuxt/app'

export function useApi<T>(url: string, options?: UseFetchOptions<T>) {
  const { $toast } = useNuxtApp()
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  return useFetch(url, {
    ...options,
    key: url,
    server: false,
    watch: false,
    onRequest({ options }) {
      options.baseURL = config.public.api as string
      options.headers = options.headers || {}
      options.headers.set('Content-Type', 'application/json')
      if (userStore.token) options.headers.set('X-Auth-Token', userStore.token)
      options.credentials = 'include'
    },
    onResponse({ response }) {
      if (response.status !== 200) {
        $toast.error('Please try again later')
        return Promise.reject()
      }
    },
    transform(response: { data: object }) { return (response.data ?? response) as T },
  })
}