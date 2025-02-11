<template lang="pug">
header.fixed.flex.w-full.p-4
  h1.font-bold.text-2xl Chat
  ElDropdown.ms-auto(v-if="userStore.token" trigger="click")
    Icon.cursor-pointer(name="material-symbols-light:menu-rounded")
    template(#dropdown)
      ElDropdownMenu
        ElDropdownItem(@click="userStore.logout()") Logout
  ElButton.ms-auto(
    v-else
    type="primary"
    size="large"
    round
    @click="useDialogStore().set({ login: true })"
  ) Log in
Login
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped lang="stylus">
.el-button
  @apply text-lg
  &+.el-button
    @apply m-0
</style>