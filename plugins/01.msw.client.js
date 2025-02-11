import { setupWorker } from 'msw/browser'
import api from '~/mocks/api'

const handlers = [...api]

export default defineNuxtPlugin(async() => {
  await setupWorker(...handlers).start({
    onUnhandledRequest: 'bypass',
  })
})
