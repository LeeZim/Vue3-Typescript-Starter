<template>
  <teleport to="#message">
    <div
      class="message-info fixed-top w-50 mx-auto d-flex justify-content-between"
      v-if="isVisible"
    >
      <div class="alert d-flex align-items-center" role="alert" :class="classObject">
        <span>{{ message }}</span>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click.prevent="hideMsg"
        ></button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, ref } from 'vue'
import store from '../store/index'

export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, context) {
    const messageDiv = document.createElement('div')
    messageDiv.id = 'message'
    document.body.appendChild(messageDiv)
    onUnmounted(() => {
      console.log('Message Unmounted')
      document.body.removeChild(messageDiv)
    })
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hideMsg = () => {
      store.commit('setError', { status: false })
      context.emit('close-message', true)
    }
    return {
      isVisible,
      classObject,
      hideMsg
    }
  }
})
</script>
