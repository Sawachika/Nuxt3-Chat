export default defineNuxtPlugin(async () => {
  if (useUserStore().token) await useRecommendStore().getLists()
})