import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../utils/testData'

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
  columns: testData,
  posts: testPosts,
  user: { isLogin: true, name: 'viking', id: 1 }
}

// Create a new store instance.
export default createStore<GlobalDataProps>({
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
    }
  },
  actions: {},
  getters: {
    getPostById: (state) => (pid: number) => {
      return state.posts.filter((p) => p.columnId === pid)
    },
    getColumnById: (state) => (cid: number) => {
      return state.columns.find((c) => c.id === cid)
    }
  }
})
