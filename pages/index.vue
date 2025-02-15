<template lang="pug">
.grid.place-content-center.size-screen.bg-gradient-linear.from-cyan-500.to-blue-500(v-if="isLoading")
  Icon.text-12(name="logos:nuxt")
.grid.place-content-center.gap-2.min-h-100vh(v-else-if="!userStore.token")
  h1.font-bold.text-2xl.text-center Nuxt3 Chat
  ElButton(
    class="animate-[shock_1s_ease-out_infinite]"
    type="primary"
    round
    @click="useDialogStore().set({ login: true })"
  ) Create account
.container.grid.gap-4.mx-auto.p-4.pt-16(v-else class="md:grid-cols-2")
  img.aspect-square.object-fit.rounded-xl(:src="user.user?.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
  .flex.flex-col.gap-4.aspect-square
    p
      span {{ user.user.name }},
      span.ms-2 {{ moment().diff(moment(user.user.birth_date), 'years') }}
    p {{ user.user.bio }}
    .interact.inline-grid.grid-cols-3.place-items-center.gap-8.mt-auto.mx-auto
      .grid.justify-items-center.gap-2.cursor-pointer(@click="pass(user.user._id)")
        Icon.text-red(name="material-symbols:close-rounded")
        span Skip
      .grid.justify-items-center.gap-2.cursor-pointer(@click="like(user.user._id)")
        Icon.text-green(name="material-symbols:check-rounded")
        span Like
      .grid.justify-items-center.gap-2.cursor-pointer(@click="superLike(user.user._id)")
        Icon.text-blue(name="material-symbols-light:favorite-rounded")
        span Super Like
</template>

<script setup lang="ts">
import moment from 'moment'
const isLoading = ref(true)
const userStore = useUserStore()
const { origin, lists } = storeToRefs(useRecommendStore())
const user = ref({})

onMounted(() => isLoading.value = false)
if (userStore.token) nextUser()
function nextUser() {
  user.value = lists.value.splice(0, 1)[0]
  if (lists.value.length < 1) lists.value.push(...origin.value)
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

<style lang="stylus">
@keyframes {shock}
  0%
    box-shadow 0 0 2px 4px #409effa6
  100%
    box-shadow 0 0 4px 8px #409eff26
</style>
<style scoped lang="stylus">
.interact .iconify
  @apply p-1 rounded-full bg-hex-8881 text-4xl
  box-shadow 0 0 8px 2px
</style>