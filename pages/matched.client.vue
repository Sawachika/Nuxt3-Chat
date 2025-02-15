<template lang="pug">
.flex.min-h-100vh.pt-16
  .grid.content-start.justify-end.gap-4.py-4.bg-gray-800.transition-all.duration-500(:class="isExpand ? 'w-50' : 'w-16'")
    .ms-auto.px-3
      Icon.text-4xl.cursor-pointer(
        :name="isExpand ? 'material-symbols-light:arrow-circle-left-outline-rounded' : 'material-symbols-light:arrow-circle-right-outline-rounded'"
        @click="isExpand = !isExpand"
      )
    .flex.gap-2.px-2(v-for="{ user } in data.matches" :key="user._id")
      img.w-12.h-12.rounded-full(:src="user.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
      p.truncate.transition-all.duration-500(:class="isExpand ? 'max-w-130px' : 'max-w-0'") {{ user.name }} {{user.name}}
</template>

<script setup lang="tsx">
definePageMeta({
  middleware: ['auth']
})
const isExpand = ref(true)
const { data } = await useApi('/v2/matches', { params: { count: 60, is_tinder_u: true, locale: true } })
</script>