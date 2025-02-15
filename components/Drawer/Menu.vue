<template lang="pug">
ElDrawer(
  v-model="model"
  append-to-body
  direction="ltr"
  size="390px"
)
  nav.grid.justify-start.gap-4.text-2xl(@click="model = false")
    NuxtLinkLocale.nuxt-link(to="/") Home
    NuxtLinkLocale.nuxt-link(to="/matched") Matched
</template>

<script setup lang="ts">
const model = defineModel({ type: Boolean })
</script>

<style scoped lang="stylus">
.nuxt-link
  @apply border-b-3 border-hex-fff6 font-bold
  &.router-link-active
    @apply border-blue text-blue
</style>