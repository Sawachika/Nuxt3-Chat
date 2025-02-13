<template lang="pug">
.grid.place-content-center.size-screen.bg-gradient-linear.from-cyan-500.to-blue-500(v-if="isLoading")
  Icon.text-12(name="logos:nuxt")
.grid.place-content-center.gap-2.min-h-100vh(v-else-if="!userStore.token")
  h1.font-bold.text-2xl.text-center Nuxt3 Chat
  ElButton(type="primary" round @click="useDialogStore().set({ login: true })") Create account
.container.grid.grid-cols-2.gap-4.mx-auto.p-4.pt-16(v-else)
  img.rounded-xl(:src="user.user.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
  .flex.flex-col.gap-4
    p
      span {{ user.user.name }},
      span.ms-2 {{ moment().diff(moment(user.user.birth_date), 'years') }}
    p {{ user.user.bio }}
    .interact.flex.gap-4.mt-auto
      Icon.text-red(name="material-symbols:close-rounded" @click="pass(user.user._id)")
      Icon.text-green(name="material-symbols:check-rounded" @click="like(user.user._id)")
      Icon.text-blue(name="material-symbols-light:favorite-rounded" @click="superLike(user.user._id)")
</template>

<script setup lang="ts">
import moment from 'moment'
const isLoading = ref(true)
const userStore = useUserStore()
const { origin, lists } = useRecommendStore()
const user = ref({})

onMounted(() => isLoading.value = false)
if (userStore.token) nextUser()
function nextUser() {
  user.value = lists.splice(0, 1)[0]
  if (lists.length < 1) lists.push(...origin)
}
async function pass(id: string) {
  const { data } = await useApi(`/pass/${id}`)
  nextUser()
}
async function like(id: string) {
  const { data } = await useApi<{ match: boolean }>(`/like/${id}`)
  nextUser()
}
async function superLike(id: string) {
  const { data } = await useApi(`/like/${id}/super`, { method: 'POST' })
  nextUser()
}
</script>

<style scoped lang="stylus">
.interact .iconify
  @apply p-1 rounded-full bg-hex-8881 text-4xl cursor-pointer
  box-shadow 0 0 8px 2px
</style>