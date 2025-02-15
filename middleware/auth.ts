const userStore = useUserStore()
const dialogStore = useDialogStore()
export default defineNuxtRouteMiddleware(() => {
  if (!userStore.token) {
    dialogStore.set({ login: true })
    return navigateTo('/')
  }
})