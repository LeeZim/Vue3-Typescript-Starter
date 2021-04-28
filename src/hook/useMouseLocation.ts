import { onMounted, onUnmounted, ref } from 'vue'

export default function useMouseLocation() {
  const x = ref<number>(0)
  const y = ref<number>(0)
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
    console.log(x.value, y.value)
  }
  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

  return { x, y }
}
