import { createStore } from 'vuex'
import {
  getColumns,
  getPosts,
  ColumnProps,
  apiColumnProps,
  PostProps,
  apiPostProps,
  getAndCommit
} from '../utils/getData'

import postAndCommit from '../utils/postAndCommit'
import axios from '../utils/axios'

export interface userProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  email?: string
  description?: string
  column?: string
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: userProps
  loading: boolean
  token: string
}

const defaultState = {
  columns: [],
  posts: [],
  user: { isLogin: false, name: 'viking', id: 1 },
  loading: false,
  token: ''
}

const store = createStore<GlobalDataProps>({
  state() {
    return defaultState
  },
  mutations: {
    // userLogin(state: GlobalDataProps) {
    //   state.user = { isLogin: true, name: 'viking' }
    // },
    userLogout(state: GlobalDataProps) {
      state.user.isLogin = false
    },
    createPost(state: GlobalDataProps, newPost: PostProps) {
      state.posts.push(newPost)
    },
    fetchColumns(state: GlobalDataProps, rawData: apiColumnProps) {
      state.columns = rawData.list
    },
    fetchPosts(state: GlobalDataProps, rawData: apiPostProps) {
      state.posts = rawData.list
    },
    setLoading(state: GlobalDataProps, status: boolean) {
      state.loading = status
    },
    login(state: GlobalDataProps, rawData) {
      const { token } = rawData.data
      state.token = token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    getCurrentUser(state: GlobalDataProps, rawData) {
      state.user = { isLogin: true, ...rawData }
    }
  },
  actions: {
    fetchColumns({ commit }) {
      getColumns('fetchColumns', commit)
    },
    fetchPosts({ commit }, columnId: string) {
      getPosts(columnId, 'fetchPosts', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    fetchUser({ commit }) {
      getAndCommit('/user/current', 'getCurrentUser', commit)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchUser')
      })
    }
  },
  getters: {
    getPostById: (state) => (pid: string) => {
      return state.posts.filter((p) => p.column === pid)
    },
    getColumnById: (state) => (cid: string) => {
      //  eslint-disable-next-line
      return state.columns.find((c) => c._id === cid)
    }
  }
})

export default store
