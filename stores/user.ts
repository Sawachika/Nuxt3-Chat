type RequestLogin = {
  region: string
  phone_number: string
  otp_code: string
}
type ResponseLogin = {
  refresh_token: string
  validated: boolean
}

export const useUserStore = defineStore('User', {
  state: () => ({
    token: '',
  }),
  actions: {
    async login(body: RequestLogin) {
      const { data } = await useApi<ResponseLogin>('/v2/auth/sms/validate', { method: 'POST', body: {
        phone_number: `${body.region}${body.phone_number}`,
        otp_code: body.otp_code
      } })
      if (!data.value) return
      this.token = data.value.refresh_token
      useDialogStore().set({ sms: false })
      useRecommendStore().getLists()
    },
    async logout() {
      const { error } = await useApi<ResponseLogin>('/v2/auth/logout', { method: 'POST', body: { refresh_token: this.token } })
      if (!error.value) this.$reset()
    }
  },
  persist: true
})