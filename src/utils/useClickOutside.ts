import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref<Boolean>(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickOutside.value = elementRef.value.contains(e.target as HTMLElement)
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
