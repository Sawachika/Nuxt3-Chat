<template lang="pug">
ElDialog(
  v-model="dialogStore.settings"
  append-to-body
  :z-index="1000"
  width="390px"
  align-center
  title="Preference"
  :before-close="confirmClose"
)
  ElForm.grid(
    ref="formRef"
    :model="form"
    :rules
    label-position="top"
  )
    ElFormItem(label="Minimum age" prop="user.age_filter_min")
      ElInputNumber(v-model="form.user.age_filter_min" :min="0" @change="formRef.validateField('user.age_filter_max')")
    ElFormItem(label="Maximum age" prop="user.age_filter_max")
      ElInputNumber(v-model="form.user.age_filter_max" :max="200" @change="formRef.validateField('user.age_filter_min')")
    ElFormItem(label="Gender" prop="user.gender_filter")
      ElRadioGroup(v-model="form.user.gender_filter")
        ElRadio(:value="0") All
        ElRadio(:value="1") Male
        ElRadio(:value="2") Female
        ElRadio(:value="3") Non-binary
        ElRadio(:value="4") LGBT+
        ElRadio(:value="5") Other
    ElFormItem(label="City" prop="user.pos.city")
      ElInput(v-model="form.user.pos.city")
    ElFormItem(label="Distance" prop="user.distance_filter")
      ElInputNumber(v-model="form.user.distance_filter" :min="0" :max="15000")
        template(#suffix) KM
    ElButton.ms-auto(type="primary" @click="submit(formRef)") Submit
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
const dialogStore = useDialogStore()
const userStore = useUserStore()
const formRef = ref()
const { profile } = userStore
const form = reactive({ account: { ...profile.account }, user: { ...profile.user } })
const rules = {
  'user.age_filter_min': [{ validator: checkMinAge, trigger: 'blur' }],
  'user.age_filter_max': [{ validator: checkMaxAge, trigger: 'blur' }],
  'user.gender_filter': [{ required: true, trigger: 'blur', message: 'Required' }],
  'user.pos.city': [{ required: true, trigger: 'blur', message: 'Required' }],
  'user.distance_filter': [{ required: true, trigger: 'blur', message: 'Required' }],
}

function checkMinAge(rule: object, value: number | null, callback: (error?: Error) => void) {
  if (value === null) callback(new Error('Required'))
  else if (value > form.user.age_filter_max) callback(new Error('Must be less than the maximum age'))
  else callback()
}
function checkMaxAge(rule: object, value: number | null, callback: (error?: Error) => void) {
  if (value === null) callback(new Error('Required'))
  else if (value < form.user.age_filter_min) callback(new Error('Must be greater than the maximum age'))
  else callback()
}
function submit(formRef: FormInstance) {
  formRef.validate(async valid => {
    if (!valid) return
    await userStore.updateProfile(form)
    Object.assign(profile, userStore.profile)
    dialogStore.set({ settings: false })
    await useRecommendStore().getLists()
    useNuxtApp().$toast.success('Refetch recommended lists')
  })
}
async function confirmClose(done: () => void) {
  await ElMessageBox.confirm('Abandon this modification?')
  Object.assign(form, { account: { ...profile.account }, user: { ...profile.user } })
  done()
}
</script>