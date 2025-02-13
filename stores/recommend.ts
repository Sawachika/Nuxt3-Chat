type Request = {
  results: Record<string, string>[]
}

export const useRecommendStore = defineStore('Recommend', {
  state: () => ({
    origin: [] as Record<string, string>[],
    lists: [] as Record<string, string>[],
  }),
  actions: {
    async getLists() {
      const { data } = await useApi<Request>('/v2/recs/core')
      if (!data.value) return
      this.origin = [...data.value.results]
      this.lists = data.value.results
    },
  },
  persist: true
})