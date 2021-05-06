import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Vuex from '@/views/vuex.vue'
import Login from '@/views/Login.vue'
import Detail from '@/views/ColumnDetail.vue'

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
    component: Login
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
