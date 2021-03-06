<template>
  <div class="mb-3">
    <slot></slot>
    <input
      v-if="tag === 'input'"
      class="form-control"
      v-model="validataRef.val"
      @blur="validInput"
      :class="{ 'is-invalid': validataRef.error }"
      @input="updateModulValue"
      v-bind="$attrs"
    />
    <textarea
      v-if="tag === 'textarea'"
      class="form-control"
      v-model="validataRef.val"
      @blur="validInput"
      :class="{ 'is-invalid': validataRef.error }"
      @input="updateModulValue"
      v-bind="$attrs"
    />
    <div id="validationServer03Feedback" class="invalid-feedback" v-if="validataRef.error">
      {{ validataRef.message }}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidForm.vue'

export interface rulesProps {
  rule: 'email' | 'passwd' | 'title' | 'content'
  min?: number
}
export type TagType = 'input' | 'textarea'

interface validataProps {
  val: string
  error: boolean
  message: string
}

interface validDataProps {
  name: string
  rules: ['empty', 'range', 'email']
}

const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/

export default defineComponent({
  inheritAttrs: false,
  props: {
    rule: Object as PropType<rulesProps>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup(props, context) {
    const validataRef: validataProps = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    const updateModulValue = (e: KeyboardEvent) => {
      const targetValue: string = (e.target as HTMLInputElement).value
      validataRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

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
          case 'title':
            name = '文章标题'
            break
          case 'content':
            name = '文章内容'
            break
          default:
            break
        }
        return name
      }),
      rules: ['empty', 'range', 'email']
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
              pass = validataRef.val.length >= (props.rule.min ? props.rule.min : 6)
              validataRef.message = !pass
                ? `${validData.name}不能少于${props.rule.min ? props.rule.min : 6}位`
                : ''
            }
            break
          case 'email':
            if (props.rule?.rule === 'email') {
              pass = emailReg.test(validataRef.val)
              validataRef.message = pass ? '' : `${validData.name}格式不正确`
            }
            break
          default:
            break
        }

        return pass
      })
      validataRef.error = !allpassed
      return allpassed
    }
    onMounted(() => {
      emitter.emit('form-item-created', validInput)
    })
    return {
      validataRef,
      validData,
      validInput,
      updateModulValue
    }
  }
})
</script>
