<template lang="pug">
.grid.place-content-center.gap-2.min-h-100vh
  h1.font-bold.text-2xl.text-center Nuxt3 Chat
  ElButton(
    v-if="!userStore.token"
    type="primary"
    round
    @click="useDialogStore().set({ login: true })"
  ) Create account
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>