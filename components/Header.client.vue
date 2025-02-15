<template lang="pug">
header.fixed.flex.w-full.p-4
  h1.font-bold.text-2xl Chat
  ElDropdown.ms-auto(v-if="userStore.token" trigger="click")
    Icon.text-3xl.cursor-pointer(name="material-symbols-light:menu-rounded")
    template(#dropdown)
      ElDropdownMenu
        ElDropdownItem(@click="useDialogStore().set({ profile: true })") Profile
        ElDropdownItem(@click="useDialogStore().set({ settings: true })") Settings
        ElDropdownItem(@click="userStore.logout()") Logout
  ElButton.ms-auto(
    v-else
    type="primary"
    size="large"
    round
    @click="useDialogStore().set({ login: true })"
  ) Log in
DialogLogin
DialogProfile
DialogSettings
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