<template>
  <div class="container">
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar: 'https://img.mukewang.com/5cf763de0001e42804000400-100-100.jpg?s=290'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar: 'https://img.mukewang.com/5cf763de0001e42804000400-100-100.jpg?s=290'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar: 'https://img.mukewang.com/5cf763de0001e42804000400-100-100.jpg?s=290'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar: 'https://img.mukewang.com/5cf763de0001e42804000400-100-100.jpg?s=290'
  },
  {
    id: 5,
    title: 'test5的专栏',
    description: '这是的test5专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar: ''
  }
]
export default defineComponent({
  name: 'App',
  setup() {
    const list = ref<ColumnProps[]>(testData)
    return {
      list
    }
  },
  components: {
    ColumnList
  }
})
</script>

<style></style>
