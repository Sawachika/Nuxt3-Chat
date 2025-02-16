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
.container.grid.gap-4.mx-auto.p-4.pt-16(v-else-if="user.user?.name" class="md:grid-cols-2")
  img.aspect-square.object-cover.object-top.w-full.rounded-xl(:src="user.user?.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
  .flex.flex-col.gap-4.aspect-square
    ElDescriptions(:title="user.user.name" :column="1")
      ElDescriptionsItem(label="Age") {{ moment().diff(moment(user.user.birth_date), 'years') }}
      ElDescriptionsItem(v-if="user.user.bio" label="Bio") {{ user.user.bio }}
      ElDescriptionsItem(v-if="user.user.schools.length" label="School") {{ user.user.schools.map(({ name }) => name).join() }}
      ElDescriptionsItem(v-if="user.distance_mi" label="Distance") {{ user.distance_mi }} mile
    .interact.inline-grid.grid-cols-3.place-items-center.gap-8.mt-auto.mx-auto
      .grid.justify-items-center.gap-2.cursor-pointer(@click="pass(user.user._id, user.user.name)")
        Icon.text-red(name="material-symbols:close-rounded")
        span Skip
      .grid.justify-items-center.gap-2.cursor-pointer(@click="like(user.user._id, user.user.name)")
        Icon.text-green(name="material-symbols:check-rounded")
        span Like
      .grid.justify-items-center.gap-2.cursor-pointer(@click="superLike(user.user._id, user.user.name)")
        Icon.text-blue(name="material-symbols-light:favorite-rounded")
        span Super Like
</template>

<script setup lang="ts">
import moment from 'moment'
const isLoading = ref(true)
const userStore = useUserStore()
const recommendedStore = useRecommendStore()
const { user } = storeToRefs(recommendedStore)
const { $toast } = useNuxtApp()

onMounted(() => isLoading.value = false)
async function pass(id: string, name: string) {
  const { data } = await useApi(`/pass/${id}`)
  $toast.info(`Skip ${name}`)
  recommendedStore.pickUser()
}
async function like(id: string, name: string) {
  const { data } = await useApi<{ match: boolean }>(`/like/${id}`)
  $toast.success(`Like ${name}`)
  recommendedStore.pickUser()
}
async function superLike(id: string, name: string) {
  const { data } = await useApi(`/like/${id}/super`, { method: 'POST' })
  $toast.success(`Super like ${name}`)
  recommendedStore.pickUser()
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