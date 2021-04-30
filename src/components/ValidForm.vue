<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type validFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    let funcArray: validFunc[] = []
    const submitForm = () => {
      const submitResult = funcArray.map((func) => func()).every((result) => result)
      context.emit('form-submit', submitResult)
    }
    const callback = (func?: validFunc) => {
      if (func) {
        funcArray.push(func)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArray = []
    })
    return {
      submitForm,
      callback
    }
  }
})
</script>
