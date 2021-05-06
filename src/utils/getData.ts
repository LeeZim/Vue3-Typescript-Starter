import axios from './axios'
import store from '../store/index'

interface AvatarProps {
  _id: string
  url: string
  createdAt?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar: AvatarProps
  description: string
  author?: string
  createdAt?: string
}

export interface PostProps {
  createdAt?: string
  excerpt?: string
  content?: string
  image: AvatarProps
  column: string
  author: string
  title: string
  _id: string
  key: number
}

export interface apiColumnProps {
  count: number
  list: ColumnProps[]
  pageSize: number
  currentPage: number
}

export interface apiPostProps {
  count: number
  list: PostProps[]
  pageSize: number
  currentPage: number
}
const getColumns = () => {
  axios.get('/columns').then((resp) => {
    store.commit('fetchColumns', resp.data.data)
  })
}

const getPosts = (columnId: string) => {
  axios.get(`/columns/${columnId}/posts`).then((resp) => {
    store.commit('fetchPosts', resp.data.data)
  })
}

export { getColumns, getPosts }
