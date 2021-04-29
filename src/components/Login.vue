<template>
  <form>
    <emailValid :rules="rules">邮箱验证</emailValid>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
    <!-- <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div> -->
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import emailValid, { emailValidsProps } from './EmailValidate.vue'

const rules: emailValidsProps = [
  {
    rule: 'required',
    message: 'Email can not be empty'
  },
  {
    rule: 'email',
    message: 'Please input a valid email'
  }
]
export default defineComponent({
  setup() {
    return {
      rules
    }
  },
  components: {
    emailValid
  }
})
</script>
