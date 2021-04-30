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
      ref="pwdModulRef"
      >密码验证</inputInputValidate
    >
    <!-- <button type="submit" class="btn btn-primary">登录</button> -->
    <template #submit>
      <button type="submit" class="btn btn-danger">SUBMIT</button>
    </template>
  </ValidForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import inputInputValidate from './InputValidate.vue'
import ValidForm from './ValidForm.vue'

export default defineComponent({
  setup() {
    const emailModulValue = ref<String>('Init String')
    const pwdModulValue = ref<String>('123')
    const onFormSubmit = (result: boolean) => {
      console.log(result)
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
