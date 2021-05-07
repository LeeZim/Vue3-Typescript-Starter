<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <!-- <div class="container-fluid"> -->
    <router-link to="/" class="navbar-brand">者也专栏</router-link>
    <!-- </div> -->
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropDown :username="user.nickName">
          <DropDownItem
            ><label for="exampleInputEmail1" class="form-label"
              ><router-link to="/create"> 新建文章</router-link></label
            ></DropDownItem
          >
          <DropDownItem :disabled="true"
            ><label for="exampleInputEmail1" class="form-label">编辑资料</label></DropDownItem
          >
          <DropDownItem
            ><label for="exampleInputEmail1" class="form-label" @click="logout"
              >退出登录</label
            ></DropDownItem
          >
        </DropDown>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import DropDown from './DropDown.vue'
import DropDownItem from './DropDownItem.vue'
import { GlobalDataProps, userProps } from '../store/index'

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<userProps>,
      required: true
    }
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const logout = () => {
      store.commit('userLogout')
      router.push('/')
    }
    return {
      logout
    }
  },
  components: {
    DropDown,
    DropDownItem
  }
})
</script>
<style scoped>
a {
  text-decoration-line: none;
  color: black;
}
</style>
