<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <!-- <div class="container-fluid"> -->
    <a href="#" class="navbar-brand">者也专栏</a>
    <!-- </div> -->
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2" @click="userLoginBtn">登录</a>
      </li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropDown :username="user.name" />
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  emits: {
    userLogin: null
  },
  setup(props, context) {
    const userLoginBtn = () => {
      context.emit('userLogin')
    }

    return {
      userLoginBtn
    }
  },
  components: {
    DropDown
  }
})
</script>
