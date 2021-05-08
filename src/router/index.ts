import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Vuex from '@/views/vuex.vue'
import Login from '@/views/Login.vue'
import Detail from '@/views/ColumnDetail.vue'
// import Create from '@/views/create.vue'
import CreatePost from '@/views/CreatePost.vue'
import axios from '../utils/axios'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/axios.vue') // 懒加载组件
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { redirectAlreadyLogin: true }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: { requiredLogin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // to是即将进入的路由
  // from是即将离开的路由
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta

  if (user.isLogin) {
    if (redirectAlreadyLogin) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    store
      .dispatch('fetchUser')
      .then(() => {
        if (redirectAlreadyLogin) {
          next({ name: 'Home' })
        } else {
          next()
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        store.commit('userLogout')
        if (requiredLogin) {
          next({ name: 'login' })
        } else {
          next()
        }
      })
  } else {
    next()
  }
})

export default router
