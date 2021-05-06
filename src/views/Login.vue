<template>
  <ValidForm @form-submit="onFormSubmit">
    <inputInputValidate
      :rule="{ rule: 'email' }"
      :min="10"
      v-model="emailModulValue"
      placeholder="请输入邮箱"
      ref="emailModulRef"
      >邮箱验证</inputInputValidate
    >
    <inputInputValidate
      :rule="{ rule: 'passwd', min: 8 }"
      type="password"
      v-model="pwdModulValue"
      placeholder="请输入密码"
      ref="pwdModulRef"
      >密码验证</inputInputValidate
    >

    <template #submit>
      <button type="submit" class="btn btn-primary">登录</button>
    </template>
  </ValidForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import inputInputValidate from '../components/InputValidate.vue'
import ValidForm from '../components/ValidForm.vue'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const emailModulValue = ref<String>('')
    const pwdModulValue = ref<String>('')
    const onFormSubmit = (result: boolean) => {
      if (result) {
        if (emailModulValue.value === 'viking@163.com' && pwdModulValue.value === '12345678') {
          setTimeout(() => {
            store.commit('userLogin')
            router.push('/')
          }, 3000)
        }
      }
    }
    return {
      emailModulValue,
      pwdModulValue,
      onFormSubmit
    }
  },
  components: {
    inputInputValidate,
    ValidForm
  }
})
</script>
