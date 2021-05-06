<template>
  <div class="container">
    <GlobalHeader :user="userInfo" />
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// 启用此行可使用bootstrap自带的js效果 比如完善的下拉菜单
// import 'bootstrap/dist/js/bootstrap.min.js'
import mitt from 'mitt'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

export const emitter = mitt()
export default defineComponent({
  name: 'App',
  setup() {
    const userInfo: UserProps = reactive({
      isLogin: true,
      name: 'Viking',
      id: 12785223
    })

    const userLoign = () => {
      userInfo.isLogin = true
      emitter.off('userLoign', userLoign)
    }
    emitter.on('userLoign', userLoign)
    return {
      userInfo,
      userLoign
    }
  },
  components: {
    GlobalHeader
  }
})
</script>

<style></style>
