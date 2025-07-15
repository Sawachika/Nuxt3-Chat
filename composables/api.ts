import type { FetchContext, FetchResponse, FetchOptions } from 'ofetch'
import type { UseFetchOptions } from 'nuxt/app'

function onRequest(url: string) {
  const userStore = useUserStore()

  return ({ options }: FetchContext) => {
    if (import.meta.server) options.baseURL = url
    options.headers = options.headers || {}
    options.headers.set('Content-Type', 'application/json')
    if (userStore.token) options.headers.set('X-Auth-Token', userStore.token)
    options.credentials = 'include'
  }
}
function onResponse<T>() {
  const { $toast } = useNuxtApp()

  return ({ response }: { response: FetchResponse<T> }) => {
    if (response.status !== 200) {
      $toast.error('Please try again later')
    }
  }
}
function transform<T>() {
  return (response: { data: object }) => {
    return (response.data ?? response) as T
  }
}
export function useApi<T>(url: string, options?: UseFetchOptions<T>) {
  const { api } = useRuntimeConfig().public

  return useFetch(url, {
    ...options,
    key: url,
    watch: false,
    onRequest: onRequest(api),
    onResponse: onResponse<T>(),
    transform: transform<T>(),
  })
}
export async function useUniversalApi<T>(url: string, options?: UseFetchOptions<T>): Promise<T | null> {
  const { $api } = useNuxtApp()
  const { api } = useRuntimeConfig().public

  if (import.meta.server) {
    const { data, error } = await useFetch(url, {
      ...options,
      key: url,
      watch: false,
      onRequest: onRequest(api),
      onResponse: onResponse<T>(),
      transform: transform<T>(),
    })
    return (data.value || error.value) as T
  } else {
    try {
      const [res] = await $api<T>(url, options as FetchOptions<'json'>)
      return res
    } catch (error) { return null }
  }
}