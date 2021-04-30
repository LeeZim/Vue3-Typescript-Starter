<template>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label"><slot>邮箱地址</slot></label>
    <input
      class="form-control"
      v-model="validataRef.val"
      @blur="validInput"
      :class="{ 'is-invalid': validataRef.error }"
    />
    <div id="validationServer03Feedback" class="invalid-feedback" v-if="validataRef.error">
      {{ validataRef.message }}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue'

export interface rulesProps {
  rule: 'email' | 'passwd'
  min?: number
}
interface validataProps {
  val: string
  error: boolean
  message: string
}

interface validDataProps {
  name: string
  rules: ['empty', 'range', 'email']
  val: string
}

const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g

export default defineComponent({
  props: {
    rule: Object as PropType<rulesProps>,
    min: {
      default: 6
    }
  },
  setup(props) {
    const validataRef: validataProps = reactive({
      val: '',
      error: false,
      message: ''
    })

    const validData: validDataProps = reactive({
      name: computed((): string => {
        let name: string = ''
        switch (props.rule?.rule) {
          case 'email':
            name = '邮箱'
            break
          case 'passwd':
            name = '密码'
            break
          default:
            break
        }
        return name
      }),
      rules: ['empty', 'range', 'email'],
      val: validataRef.val
    })

    const validInput = () => {
      const allpassed: boolean = validData.rules.every((rule) => {
        let pass = true
        switch (rule) {
          case 'empty':
            pass = validataRef.val !== ''
            validataRef.message = !pass ? `${validData.name}不能为空` : ''
            break
          case 'range':
            if (props.rule?.rule === 'passwd') {
              pass = validataRef.val.length >= props.min
              validataRef.message = !pass ? `${validData.name}不能少于${props.min}位` : ''
            }
            break
          case 'email':
            if (props.rule?.rule === 'email') {
              pass = emailReg.test(validataRef.val)
              validataRef.message = !pass ? `${validData.name}格式不正确` : ''
            }
            break
          default:
            break
        }
        return pass
      })
      validataRef.error = !allpassed
    }

    return {
      validataRef,
      validData,
      validInput
    }
  }
})
</script>
