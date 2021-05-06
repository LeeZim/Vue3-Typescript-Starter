import { createStore } from 'vuex'
import {
  getColumns,
  getPosts,
  ColumnProps,
  apiColumnProps,
  PostProps,
  apiPostProps
} from '../utils/getData'

interface userProps {
  isLogin: boolean
  name?: string
  id?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: userProps
}

const defaultState = {
  columns: [],
  posts: [],
  user: { isLogin: true, name: 'viking', id: 1 }
}

const store = createStore<GlobalDataProps>({
  state() {
    return defaultState
  },
  mutations: {
    userLogin(state: GlobalDataProps) {
      state.user = { isLogin: true, name: 'viking' }
    },
    userLogout(state: GlobalDataProps) {
      state.user = { isLogin: false, name: 'viking' }
    },
    createPost(state: GlobalDataProps, newPost: PostProps) {
      state.posts.push(newPost)
    },
    fetchColumns(state: GlobalDataProps, rawData: apiColumnProps) {
      state.columns = rawData.list
    },
    fetchPosts(state: GlobalDataProps, rawData: apiPostProps) {
      state.posts = rawData.list
      console.log(rawData.list)
    }
  },
  actions: {
    fetchColumns() {
      getColumns()
    },
    fetchPosts(context, columnId: string) {
      getPosts(columnId)
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
