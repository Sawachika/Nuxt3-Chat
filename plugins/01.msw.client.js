import { setupWorker } from 'msw/browser'
import auth from '~/mocks/auth'
import profile from '~/mocks/profile'
import recommend from '~/mocks/recommend'
import user from '~/mocks/user'

const handlers = [...auth, ...profile, ...recommend, ...user]

export default defineNuxtPlugin(async() => {
  await setupWorker(...handlers).start({
    onUnhandledRequest: 'bypass',
  })
})
