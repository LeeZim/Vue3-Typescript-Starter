<template>
  <form>
    <inputInputValidate
      :rule="{ rule: 'email' }"
      :min="10"
      v-model="emailModulValue"
      placeholder="请输入邮箱"
      >邮箱验证</inputInputValidate
    >
    <h1>{{ emailModulValue }}</h1>
    <inputInputValidate :rule="{ rule: 'passwd' }" :min="10" type="password"
      >密码验证</inputInputValidate
    >
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import inputInputValidate from './InputValidate.vue'

export default defineComponent({
  setup() {
    const emailModulValue = ref<String>('Init String')
    return {
      emailModulValue
    }
  },
  components: {
    inputInputValidate
  }
})
</script>
