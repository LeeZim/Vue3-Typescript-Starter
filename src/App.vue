<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <Loader v-if="isLoading" text="拼命加载中" background="rgba(255, 255, 255, 0.6)" />
    <Message :type="'error'" :message="errorMsg.message" v-if="errorMsg.status" />
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
import { computed, defineComponent, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// 启用此行可使用bootstrap自带的js效果 比如完善的下拉菜单
// import 'bootstrap/dist/js/bootstrap.min.js'
import mitt from 'mitt'
import { useStore } from 'vuex'
import { GlobalDataProps, userProps } from './store/index'
import GlobalHeader from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import Message from './components/Message.vue'
import axios from './utils/axios'

export const emitter = mitt()
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed<userProps>(() => store.state.user)
    const isLoading = computed<boolean>(() => store.state.loading)
    const token = computed(() => store.state.token)
    onMounted(() => {
      if (token.value && !currentUser.value.isLogin) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchUser').then(() => {
          store.state.user.isLogin = true
        })
      }
    })
    const errorMsg = computed(() => store.state.error)
    return {
      currentUser,
      isLoading,
      errorMsg
    }
  },
  components: {
    GlobalHeader,
    Loader,
    Message
  }
})
</script>

<style></style>
