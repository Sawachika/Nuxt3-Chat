export const useDialogStore = defineStore('Dialog', {
  state: () => ({
    login: false,
    sms: false,
  }),
  actions: {
    set(value: Record<string, boolean>) {
      this.$patch(value)
    },
  },
})