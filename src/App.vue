<template>
  <div id="main">
    <Modal :isOpen="modalIsopen" @close-modal="onModalClose">My Modal</Modal>
    <img alt="Vue logo" src="./assets/logo.png" />
    <Suspense>
      <template #default>
        <AsyncShow />
      </template>
      <template #fallback>
        <h1>loading</h1>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <DogShow />
      </template>
      <template #fallback>
        <h1>Dog Loading</h1>
      </template>
    </Suspense>
    <h1>{{ error }}</h1>
    <button @click="openModal">OpenModal</button>
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increase">+1</button>
    <h1>{{ name }}</h1>
    <h1>{{ age }}</h1>
    <button @click="reName">重命名</button>
    <h1>{{ x }}</h1>
    <h1>{{ y }}</h1>
    <ul>
      <li v-for="item in numbers" :key="item">{{ item }}</li>
    </ul>
    <h1 v-if="loading">Loading...</h1>
    <img v-if="loaded" :src="result[0].url" alt="" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onErrorCaptured, reactive, ref, toRefs, watch } from 'vue'
import useMouseLocation from './hook/useMouseLocation'
import useURLLoader from './hook/useURLLoader'
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'

interface Info {
  name: string
  age: number
  numbers: number[]
  reName: () => void
}
// eslint-disable-next-line
interface Dogtype {
  message: string
  statue: string
}

interface Cattype {
  breeds: string
  id: string
  url: string
  width: number
  height: number
}

export default defineComponent({
  name: 'App',
  setup() {
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })
    const count = ref<number>(0)
    const double: Number = computed(() => {
      return count.value * 2
    })
    const increase = () => {
      count.value += 1
    }
    const xy = reactive(useMouseLocation())
    const info = reactive<Info>({
      name: '小明',
      age: 18,
      numbers: [],
      reName: () => {
        info.name = '小红'
        count.value += 1
        console.log(info.name)
      }
    })
    const { result, loading, loaded } = useURLLoader<Cattype[]>(
      'https://api.thecatapi.com/v1/images/search?limit=1'
    )

    const modalIsopen = ref<boolean>(false)
    const openModal = () => {
      modalIsopen.value = true
    }
    const onModalClose = () => {
      modalIsopen.value = false
    }
    // watch必须是一个响应式对象，比如indo.name是一个string类型，不是响应式对象，就不能作为一个监视源
    watch([count, () => info.name], (newValue, oldValue) => {
      document.title = newValue
      console.log(oldValue)
    })
    info.numbers = [1, 2, 3]

    return {
      count,
      increase,
      double,
      ...toRefs(info),
      ...toRefs(xy),
      result,
      loading,
      loaded,
      openModal,
      onModalClose,
      modalIsopen,
      error
    }
  },
  components: {
    Modal,
    AsyncShow,
    DogShow
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
