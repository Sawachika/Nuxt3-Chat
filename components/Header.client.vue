<template lang="pug">
header.fixed.flex.gap-4.w-full.p-4
  Icon.text-3xl.cursor-pointer(name="material-symbols-light:menu-rounded" @click="visibleMenu = true")
  NuxtLinkLocale.font-bold.text-2xl(to="/") Nuxt3-Chat
  ElDropdown.ms-auto(v-if="userStore.token" trigger="click")
    img.w-8.h-8.rounded-full.cursor-pointer(:src="userStore.profile.user.photos?.[0].url" @error="$event.target.src = '/image/avatar.jpg'")
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
DrawerMenu(v-model="visibleMenu")
DialogLogin
DialogProfile
DialogSettings
</template>

<script setup lang="ts">
const userStore = useUserStore()
const visibleMenu = ref(false)
</script>

<style scoped lang="stylus">
.el-button
  @apply text-lg
  &+.el-button
    @apply m-0
</style>