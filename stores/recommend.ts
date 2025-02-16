type User = { [key: string]: Record<string, string> }
type Results = User[]
type Request = { results: Results }

export const useRecommendStore = defineStore('Recommend', {
  state: () => ({
    origin: [] as Results,
    lists: [] as Results,
    user: {} as User,
  }),
  actions: {
    async getLists() {
      const { data } = await useApi<Request>('/v2/recs/core')
      if (!data.value) return
      this.origin = [...data.value.results]
      this.lists = data.value.results
      this.pickUser()
    },
    pickUser() {
      this.user = this.lists.splice(0, 1)[0]
      if (this.lists.length < 1) this.lists.push(...this.origin)
    }
  },
  persist: true
})