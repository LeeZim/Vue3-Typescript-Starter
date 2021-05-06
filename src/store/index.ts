import { createStore } from 'vuex'
import { testPosts, PostProps } from '../utils/testData'
import getColumns, { ColumnProps, apiColumnProps } from '../utils/getData'

interface userProps {
  isLogin: boolean
  name?: string
  id?: number
}

// interface AvatarProps {
//   _id: string
//   url: string
//   createdAt: string
// }

// export interface ColumnProps {
//   _id: number
//   title: string
//   avatar?: AvatarProps
//   description: string
//   author?: string
//   createdAt?: string
// }

// export interface apiColumnProps {
//   count: number
//   pageSize: number
//   currentPage: number
//   list: ColumnProps[]
// }

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: userProps
}

const defaultState = {
  columns: [],
  posts: testPosts,
  user: { isLogin: true, name: 'viking', id: 1 }
}

// Create a new store instance.
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
    }
  },
  actions: {
    fetchColumns() {
      getColumns()
    }
  },
  getters: {
    getPostById: (state) => (pid: number) => {
      return state.posts.filter((p) => p.columnId === pid)
    },
    getColumnById: (state) => (cid: number) => {
      //  eslint-disable-next-line
      return state.columns.find((c) => c._id === cid)
    }
  }
})

export default store
