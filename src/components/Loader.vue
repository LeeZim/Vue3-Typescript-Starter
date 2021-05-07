<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden sr-only">{{ text || 'loading' }}</span>
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup() {
    const back = document.createElement('div')
    back.id = 'back'
    document.body.appendChild(back)
    onUnmounted(() => {
      document.body.removeChild(back)
    })
  }
})
</script>
<style scoped lang="stylus">
.loading-container {
  background : rgba(255, 255, 255, .7);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center
}
</style>
