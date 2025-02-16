<template lang="pug">
.flex.min-h-100vh.pt-16
  .shrink-0.grid.content-start.gap-4.py-4.bg-gray-800.transition-all.duration-500(class="max-w-3/7" :class="isExpand ? 'w-50' : 'w-16'")
    .flex.items-center.gap-2.ms-auto.px-3
      span(v-show="isExpand") Collapse
      Icon.text-4xl.cursor-pointer(
        :name="isExpand ? 'material-symbols-light:arrow-circle-left-outline-rounded' : 'material-symbols-light:arrow-circle-right-outline-rounded'"
        @click="isExpand = !isExpand"
      )
    .flex.gap-2.px-2.cursor-pointer(v-for="match in data.matches" :key="match.user._id" @click="changePartner(match)")
      img.object-cover.object-top.w-12.h-12.rounded-full(:src="match.user.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
      p.truncate.transition-all.duration-500(:class="isExpand ? 'max-w-130px' : 'max-w-0'") {{ match.user.name }}
  .px-4(v-if="partner" class="lg:(flex flex-wrap items-start gap-4)")
    img.aspect-square.object-cover.object-top.w-100.rounded-xl(:src="partner.user?.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
    ElDescriptions(:title="partner.user.name" :column="1")
      ElDescriptionsItem(label="Birthday") {{ moment(partner.user.birth_date).format('YYYY/MM/DD') }}
      ElDescriptionsItem(v-if="partner.user.bio" label="Bio") {{ partner.user.bio }}
      ElDescriptionsItem(v-if="partner.user.schools.length" label="School") {{ partner.user.schools.map(({ name }) => name).join() }}
      ElDescriptionsItem(v-if="partner.distance_mi" label="Distance") {{ partner.distance_mi }} mile
  .grid.place-content-center.w-full.px-4(v-else)
    p Select the user on the left to start chatting
    p Or find
      NuxtLinkLocale.ms-2.text-blue(to="/") new matches
  BeautifulChat(
    v-if="partner"
    :participants="participants"
    :titleImageUrl="titleImageUrl"
    :onMessageWasSent="onMessageWasSent"
    :messageList="partner.messageList"
    :newMessagesCount="newMessagesCount"
    :isOpen="isChatOpen"
    :close="closeChat"
    :icons="icons"
    :open="openChat"
    :showTypingIndicator="showTypingIndicator"
    :showLauncher="true"
    :showCloseButton="true"
    :colors="colors"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :disableUserListToggle="false"
    :messageStyling="messageStyling"
    :messageMargin="messageMargin"
  )
</template>

<script setup lang="ts">
import moment from 'moment'
definePageMeta({
  middleware: ['auth']
})
const isExpand = ref(true)
const { data } = await useApi('/v2/matches', { params: { count: 60, is_tinder_u: true, locale: true } })
const partner = ref()

const participants = ref([
  { id: 'user1', name: computed(() => partner.value?.user.name), imageUrl: computed(() => partner.value?.user.photos[0].url) },
])

const titleImageUrl = '/image/avatar.jpg'
const messageList = ref([
  { type: 'text', author: 'me', data: { text: 'Hi!' } },
  { type: 'text', author: 'user1', data: { text: 'Hi.' } }
])
const newMessagesCount = ref(0)
const isChatOpen = ref(false)
const icons = ref({
  'open': { 'img': 'data:image/svg+xml,%3csvg%20xmlns=\'http://www.w3.org/2000/svg\'%20xmlns:xlink=\'http://www.w3.org/1999/xlink\'%20width=\'18\'%20height=\'18\'%3e%3crect%20id=\'backgroundrect\'%20width=\'100%25\'%20height=\'100%25\'%20x=\'0\'%20y=\'0\'%20fill=\'none\'%20stroke=\'none\'/%3e%3cdefs%3e%3cstyle%3e.a{fill:none;}.b{fill:%234e8cff;}.c{clip-path:url(%23a);}.d{fill:%23fff;}.e{fill:%23eff4f9;}%3c/style%3e%3cclipPath%20id=\'a\'%3e%3cpath%20class=\'a\'%20d=\'M%200%200%20H%2017.555%20v%2017.555%20H%200%20Z\'%20id=\'svg_1\'%20transform=\'\'/%3e%3c/clipPath%3e%3c/defs%3e%3cg%20class=\'currentLayer\'%20style=\'\'%3e%3ctitle%3eLayer%201%3c/title%3e%3cg%20id=\'svg_2\'%20class=\'selected\'%20transform=\'\'%3e%3cg%20id=\'svg_3\'%20transform=\'\'%3e%3cg%20class=\'c\'%20id=\'svg_4\'%20transform=\'\'%3e%3cg%20id=\'svg_5\'%20transform=\'\'%3e%3cpath%20class=\'d\'%20d=\'M%2017.556%208.77842%20a%208.778%208.778%200%200%200%20-8.778%20-8.778%20a%208.778%208.778%200%200%200%20-8.778%208.778%20a%208.745%208.745%200%200%200%202.26%205.879%20v%201.442%20c%200%200.8%200.492%201.457%201.1%201.457%20h%205.83%20a%200.843%200.843%200%200%200%200.183%20-0.02%20a%208.778%208.778%200%200%200%208.184%20-8.757\'%20id=\'svg_6\'%20transform=\'\'/%3e%3c/g%3e%3cg%20id=\'svg_7\'%20transform=\'\'%3e%3cpath%20class=\'e\'%20d=\'M%203.16148%208.921%20a%209.292%209.292%200%200%201%206.38%20-8.888%20c%20-0.252%20-0.022%20-0.506%20-0.033%20-0.763%20-0.033%20a%208.774%208.774%200%200%200%20-8.778%208.778%20A%209.508%209.508%200%200%200%202.22447%2014.7003%20c%200.005%200%200%200.009%200%200.01%20c%20-0.311%200.352%20-1.924%202.849%200.021%202.849%20h%202.25%20c%20-1.23%20-0.022%201.263%20-2.107%200.269%20-3.494%20a%208.225%208.225%200%200%201%20-1.6%20-5.141\'%20id=\'svg_8\'%20transform=\'\'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e', 'name': 'default' },
  'close': { 'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKVQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uP3jVQAAADd0Uk5TAE9lCAXd9XA4y/9zDQJG7HYB8Hc3yHoPQ8fuezMSoYPrEcEugj0tqb6G+Lw5ifHcKk3SIAx/MjRpS8YAAADsSURBVHic7dDJDoIwEIDhQURwQNGiIBVkUQH3BfX9H00MEvHW9qj9L3RIvkxTAJlMJvu1lI7aHtWOwm67Wk9vz3pP67Jro4+m1QyWiX2D3cJgqNmjt7ZGtjYccGAYK8R26qNjE2XMY6smU3Q9AM/F6YSTVrtnPp173pz6M969Lx1Q6rqUBgK2KvAR/UCIAoQLxEUoiCMSxyQSokmE6XKZYpQI2BVJ1wDrlKz4dXXn7PXN+G8e5lhk9TErMOd6tXCz3e2bYb/bbnj04Xg6f6bz6Xhgtxe8lu25vOKFGd/uj+8fj/uNfbVMJpP9QU/STxAzeUFqVwAAAABJRU5ErkJggg==', 'name': 'default' },
  'minimize': { 'img': null, 'name': 'default' }
})
const showTypingIndicator = ref('')
const colors = ref({
  header: { bg: '#4e8cff', text: '#ffffff' },
  launcher: { bg: '#4e8cff' },
  messageList: { bg: '#ffffff' },
  sentMessage: { bg: '#4e8cff', text: '#ffffff' },
  receivedMessage: { bg: '#eaeaea', text: '#222222' },
  userInput: { bg: '#f4f7f9', text: '#565867' },
  emojiPicker: { bg: 'white', text: '#b8c3ca' }
})
const alwaysScrollToBottom = ref(false)
const messageStyling = ref(true)
const messageMargin = ref({ system: '25px auto' })

function changePartner(user: Record<string, string>) {
  partner.value = user
  if (!partner.value.messageList) partner.value.messageList = messageList.value
}
function onMessageWasSent(message: { author: string, data: { text: string }, type: string }) {
  if (message.data.text) {
    newMessagesCount.value = isChatOpen.value ? newMessagesCount.value : newMessagesCount.value + 1
    partner.value.messageList = [...partner.value.messageList, message]
  }
}
function closeChat() {
  isChatOpen.value = false
}
function openChat() {
  isChatOpen.value = true
}
</script>

<style scoped lang="stylus">
:deep()
  .sc-header--img
    @apply w-15
  .sc-message--avatar
    @apply w-10 h-10
</style>