<template>
  <div class="dropdown" ref="dropdownitemRef">
    <button
      class="btn btn-primary dropdown-toggle btn-outline-light my-2"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="switchClick"
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
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../utils/useClickOutside'

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
    const dropdownitemRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownitemRef)
    watch(isClickOutside, () => {
      if (!isClickOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    const switchClick = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      dropdownitemRef,
      switchClick
    }
  }
})
</script>
