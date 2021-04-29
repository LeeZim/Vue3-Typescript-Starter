<template>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label"><slot>邮箱地址</slot></label>
    <input
      type="email"
      class="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      v-model="emailRef.val"
      @blur="validateEmail"
      :class="{ 'is-invalid': emailRef.error }"
    />
    <div id="validationServer03Feedback" class="invalid-feedback" v-if="emailRef.error">
      {{ emailRef.massage }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'

interface emailValidProps {
  rule: 'required' | 'email'
  message: string
}
export type emailValidsProps = emailValidProps[]
export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<emailValidsProps>,
      required: true
    }
  },
  setup(props) {
    const emailRef = reactive({
      val: '',
      error: false,
      massage: ''
    })
    const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g
    const validateEmail = () => {
      if (props.rules) {
        const allpassed = props.rules.every((rule) => {
          let passed: Boolean = true

          switch (rule.rule) {
            case 'required':
              passed = emailRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(emailRef.val)
              break
            default:
              break
          }
          emailRef.massage = passed ? '' : rule.message
          return passed
        })
        emailRef.error = !allpassed
      }
    }
    return {
      emailRef,
      validateEmail
    }
  }
})
</script>
