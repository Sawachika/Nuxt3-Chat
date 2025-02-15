export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  if (userStore.token) {
    userStore.getProfile()
    useRecommendStore().getLists()
  }
})