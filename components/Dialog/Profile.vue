<template lang="pug">
ElDialog(
  v-model="dialogStore.profile"
  append-to-body
  :z-index="1000"
  width="390px"
  align-center
  title="Profile"
  :before-close="confirmClose"
)
  ElForm.grid(
    ref="formRef"
    :model="form"
    :rules
    label-position="top"
  )
    ElFormItem(label="Name" prop="user.name")
      ElInput(v-model="form.user.name")
    ElFormItem(label="Email" prop="account.account_email")
      ElInput(v-model="form.account.account_email")
    ElFormItem(label="Birthday" prop="user.birth_date")
      ElDatePicker(v-model="form.user.birth_date")
    ElFormItem(label="Bio" prop="user.bio")
      ElInput(v-model="form.user.bio")
    ElButton.ms-auto(type="primary" @click="submit(formRef)") Submit
</template>

<script setup lang="tsx">
import type { FormInstance } from 'element-plus'
const dialogStore = useDialogStore()
const userStore = useUserStore()
const formRef = ref()
const { profile } = userStore
const form = reactive({ account: { ...profile.account }, user: { ...profile.user } })
const rules = {
  'user.name': [{ required: true, trigger: 'blur', message: 'Required' }],
  'account.account_email': [{ required: true, trigger: 'blur', message: 'Required' }],
  'user.birth_date': [{ required: true, trigger: 'blur', message: 'Required' }],
  'user.bio': [{ required: true, trigger: 'blur', message: 'Required' }],
}

function submit(formRef: FormInstance) {
  formRef.validate(async valid => {
    if (!valid) return
    await userStore.updateProfile(form)
    Object.assign(profile, userStore.profile)
    dialogStore.set({ profile: false })
  })
}
async function confirmClose(done: () => void) {
  await ElMessageBox.confirm('Abandon this modification?')
  Object.assign(form, { account: { ...profile.account }, user: { ...profile.user } })
  done()
}
</script>