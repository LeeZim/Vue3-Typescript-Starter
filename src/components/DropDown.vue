<template>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle btn-outline-light my-2"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="isOpen = !isOpen"
    >
      欢迎 {{ username }}
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton1"
      :style="{ display: 'block' }"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DropDown',
  props: {
    username: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref<Boolean>(false)
    return {
      isOpen
    }
  }
})
</script>
