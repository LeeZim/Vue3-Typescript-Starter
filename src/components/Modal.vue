<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>This is a modal</slot>
      </h2>
      <button @click="btnclisk">X</button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isOpen: Boolean
  },
  emits: {
    // 带验证函数
    // 'close-modal': (payload: any) => {
    //   return payload.type === 'close'
    // }

    // 无验证事件
    'close-modal': null
  },
  setup(props, context) {
    const btnclisk = () => {
      // 带验证属性
      // context.emit('close-modal', { type: 'hello' })
      // 不带验证属性
      context.emit('close-modal')
    }
    return {
      btnclisk
    }
  }
})
</script>
<style scoped>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
