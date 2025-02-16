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
    ElFormItem(label="Photo")
      ElUpload(
        ref="upload"
        list-type="picture-card"
        :file-list="files"
        :limit="1"
        :auto-upload="false"
        :on-exceed="changeFile"
      )
        template(#trigger)
          Icon.text-4xl(name="material-symbols-light:add-2-rounded")
        .mt-2.text-right
          ElButton(type="primary" :disabled @click="useNuxtApp().$toast.success('Image uploaded')") Upload
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

<script setup lang="ts">
import { genFileId } from 'element-plus'
import type { FormInstance, UploadProps, UploadRawFile } from 'element-plus'
const dialogStore = useDialogStore()
const userStore = useUserStore()
const formRef = ref()
const { profile } = storeToRefs(userStore)
const upload = ref()
const files = ref()
const disabled = ref(true)
const form = reactive({})
const rules = {
  'user.name': [{ required: true, trigger: 'blur', message: 'Required' }],
  'account.account_email': [{ required: true, trigger: 'blur', message: 'Required' }],
  'user.birth_date': [{ required: true, trigger: 'blur', message: 'Required' }],
  'user.bio': [{ required: true, trigger: 'blur', message: 'Required' }],
}

watch(() => dialogStore.profile, value => {
  if (!value) return
  Object.assign(form, { account: { ...profile.value.account }, user: { ...profile.value.user } })
  files.value = [{ url: profile.value.user.photos?.[0].url }]
})
const changeFile: UploadProps['onExceed'] = files => {
  disabled.value = false
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
function submit(formRef: FormInstance) {
  formRef.validate(async valid => {
    if (!valid) return
    await userStore.updateProfile(form)
    dialogStore.set({ profile: false })
    useNuxtApp().$toast.success('Profile Updated')
  })
}
async function confirmClose(done: () => void) {
  if (JSON.stringify(form) === JSON.stringify({ account: { ...profile.value.account }, user: { ...profile.value.user } })) return done()

  await ElMessageBox.confirm('Abandon this modification?')
  Object.assign(form, { account: { ...profile.value.account }, user: { ...profile.value.user } })
  files.value = [{ url: profile.value.user.photos[0].url }]
  done()
}
</script>

<style scoped lang="stylus">
:deep() .el-upload-list--picture-card .el-upload-list__item
  @apply transition-none
</style>