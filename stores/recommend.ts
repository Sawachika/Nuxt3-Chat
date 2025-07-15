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
      const res = await useUniversalApi<Request>('/v2/recs/core')
      if (!res) return
      this.origin = [...res.results]
      this.lists = res.results
      this.pickUser()
    },
    pickUser() {
      this.user = this.lists.splice(0, 1)[0]
      if (this.lists.length < 1) this.lists.push(...this.origin)
    }
  },
  persist: true
})