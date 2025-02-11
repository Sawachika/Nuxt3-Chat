<template lang="pug">
ElDialog(
  v-model="dialogStore.login"
  append-to-body
  width="390px"
  align-center
)
  .grid.gap-4
    p.text-2xl.text-center Log in with
    ElButton(size="large" round) Facebook
    ElButton(size="large" round @click="dialogStore.set({ login: false, sms: true })") SMS
ElDialog(
  v-model="dialogStore.sms"
  append-to-body
  width="390px"
  align-center
)
  ElForm(
    ref="formRef"
    :model="form"
    :rules
    label-position="top"
  )
    ElFormItem(prop="region" label="Country")
      ElSelect(v-model="form.region")
        ElOption(
          v-for="{ label, value } in regions"
          :key="value"
          :label
          :value
        )
    ElFormItem(type="tel" prop="phone_number" label="Phone Number")
      ElInput(v-model="form.phone_number")
    ElFormItem(v-if="code" prop="otp_code" label="Verification code")
      ElInput(v-model="form.otp_code")
    ElFormItem
      ElButton(
        size="large"
        round
        :disabled
        @click="getVerificationCode"
      ) {{ code ? 'Resend' : 'Get verification code' }}
      span.ms-2(v-if="countdown") Can be resent after {{ countdown }} seconds
    ElFormItem
      ElButton(
        v-if="code"
        size="large"
        round
        @click="login(formRef)"
      ) Login
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
const dialogStore = useDialogStore()
const formRef = ref()
const form = reactive({
  region: '886',
  phone_number: '',
  otp_code: '',
})
const rules = {
  region: [{ required: true, trigger: 'blur', message: 'Required' }],
  phone_number: [
    { required: true, trigger: 'blur', message: 'Required' },
    { type: 'string', pattern: /^[0-9]+$/, trigger: 'blur', message: 'Wrong format' },
  ],
  otp_code: [{ required: true, trigger: 'blur', message: 'Required' }],
}
const regions = [
  { label: 'Japan +81', value: '81' },
  { label: 'Korea +82', value: '82' },
  { label: 'Taiwan +886', value: '886' },
]
const code = ref()
const disabled = ref(false)
const countdown = ref(0)
const { $toast } = useNuxtApp()

async function getVerificationCode() {
  if (!form.phone_number) return $toast.error('Please enter phone number')
  if (!/^[0-9]+$/.test(form.phone_number)) return $toast.warn('Please enter only numbers')
  const { data } = await useApi('/v2/auth/sms/send', { method: 'POST', body: {
    phone_number: `${form.region}${form.phone_number}`,
  } })
  code.value = data
  lockResend()
}
function lockResend(seconds = 3) {
  disabled.value = true
  countdown.value = seconds
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value < 1) {
      clearInterval(interval)
      disabled.value = false
    }
  }, 1000)
}
function login(formRef: FormInstance) {
  formRef.validate(async valid => {
    if (!valid) return
    await useUserStore().login(form)
    formRef.resetFields()
    code.value = null
  })
}
</script>

<style scoped lang="stylus">
.el-button
  @apply text-lg
  &+.el-button
    @apply m-0
</style>