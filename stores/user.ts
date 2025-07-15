type RequestLogin = {
  region: string
  phone_number: string
  otp_code: string
}
type ResponseLogin = {
  refresh_token: string
  validated: boolean
}
type User = {
  age_filter_min: number
  age_filter_max: number
  photos: { url: string }[]
  pos: object
}
type RequestProfile = {
  account: object
  user: User
}

export const useUserStore = defineStore('User', {
  state: () => ({
    token: '',
    profile: {
      account: {},
      user: {
        age_filter_min: 0,
        age_filter_max: 0,
      } as User,
    },
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
      this.getProfile()
      useRecommendStore().getLists()
    },
    async logout() {
      const { error } = await useApi<ResponseLogin>('/v2/auth/logout', { method: 'POST', body: { refresh_token: this.token } })
      if (error.value) return
      this.$reset()
      navigateTo('/')
    },
    async getProfile() {
      const { data } = await useApi<RequestProfile>('/v2/profile')
      if (data.value) this.profile = data.value
    },
    async updateProfile(body: object) {
      const [res] = await this.$api<RequestProfile>('/v2/profile', { method: 'POST', body })
      if (res) this.profile = { ...this.profile, ...res }
    },
  },
  persist: {
    pick: ['token']
  }
})