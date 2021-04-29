<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled }">
    <a class="dropdown-item" href="#">
      <slot></slot>
    </a>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {}
})
</script>
<style scoped>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
