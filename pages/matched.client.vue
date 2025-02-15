<template lang="pug">
.flex.min-h-100vh.pt-16
  .shrink-0.grid.content-start.gap-4.py-4.bg-gray-800.transition-all.duration-500(class="max-w-3/7" :class="isExpand ? 'w-50' : 'w-16'")
    .ms-auto.px-3
      Icon.text-4xl.cursor-pointer(
        :name="isExpand ? 'material-symbols-light:arrow-circle-left-outline-rounded' : 'material-symbols-light:arrow-circle-right-outline-rounded'"
        @click="isExpand = !isExpand"
      )
    .flex.gap-2.px-2.cursor-pointer(v-for="match in data.matches" :key="match.user._id" @click="partner = match")
      img.w-12.h-12.rounded-full(:src="match.user.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
      p.truncate.transition-all.duration-500(:class="isExpand ? 'max-w-130px' : 'max-w-0'") {{ match.user.name }}
  .px-4(v-if="partner" class="md:(grid grid-cols-2 gap-4)")
    img.aspect-square.object-fit.max-w-100.rounded-xl(:src="partner.user?.photos[0].url" @error="$event.target.src = '/image/avatar.jpg'")
    .flex.flex-col.gap-4.aspect-square
      p
        span {{ partner.user.name }},
        span.ms-2 {{ moment().diff(moment(partner.user.birth_date), 'years') }}
      p {{ partner.user.bio }}
  BeautifulChat(
    :participants="participants"
    :titleImageUrl="titleImageUrl"
    :onMessageWasSent="onMessageWasSent"
    :messageList="messageList"
    :newMessagesCount="newMessagesCount"
    :isOpen="isChatOpen"
    :close="closeChat"
    :minimize="handleMinimize"
    :open="openChat"
    :showEmoji="true"
    :showFile="true"
    :showEdition="true"
    :showDeletion="true"
    :deletionConfirmation="true"
    :showTypingIndicator="showTypingIndicator"
    :showLauncher="true"
    :showCloseButton="true"
    :colors="colors"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :disableUserListToggle="false"
    :messageStyling="messageStyling"
    :messageMargin="messageMargin"
    :showMinimizeButton="true"
    @onType="handleOnType"
    @edit="editMessage"
  )
</template>

<script setup >
import moment from 'moment'
definePageMeta({
  middleware: ['auth']
})
const isExpand = ref(true)
const { data } = await useApi('/v2/matches', { params: { count: 60, is_tinder_u: true, locale: true } })
const partner = ref()

const participants = ref([
  { id: 'user1', name: 'Matteo', imageUrl: '/image/avatar.jpg' },
  { id: 'user2', name: 'Support', imageUrl: '/image/avatar.jpg' }
])

const titleImageUrl = '/image/avatar.jpg'
const messageList = ref([
  { type: 'text', author: 'me', data: { text: 'Hi!' } },
  { type: 'text', author: 'user1', data: { text: 'Hi.' } }
])
const newMessagesCount = ref(0)
const isChatOpen = ref(false)
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
const acceptedFileTypes = ref(['image/*', 'audio/*'])

const onMessageWasSent = message => {
  // Handle message sending
}

const closeChat = () => {
  isChatOpen.value = false
}

const handleMinimize = () => {
  // Handle minimize action
}

const openChat = () => {
  isChatOpen.value = true
}

const handleOnType = () => {
  // Handle typing
}

const editMessage = () => {
  // Handle message editing
}
</script>