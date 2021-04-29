<template>
  <div class="container">
    <GlobalHeader :user="userInfo" @userLogin="userLoign" />
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181223%2F19f8b83848b44920808942ba4442709d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622247138&t=9be7f6ba8093d1cd53547979bf640f51'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181223%2F19f8b83848b44920808942ba4442709d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622247138&t=9be7f6ba8093d1cd53547979bf640f51'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181223%2F19f8b83848b44920808942ba4442709d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622247138&t=9be7f6ba8093d1cd53547979bf640f51'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更细腻一下哦',
    avantar:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181223%2F19f8b83848b44920808942ba4442709d.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622247138&t=9be7f6ba8093d1cd53547979bf640f51'
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

    const userInfo: UserProps = reactive({
      isLogin: false,
      name: 'Viking',
      id: 12785223
    })
    const userLoign = () => {
      userInfo.isLogin = true
      console.log(userInfo.isLogin)
    }

    return {
      list,
      userInfo,
      userLoign
    }
  },
  components: {
    ColumnList,
    GlobalHeader
  }
})
</script>

<style></style>
