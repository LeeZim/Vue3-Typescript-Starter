import axios from './axios'
import store from '../store/index'

interface AvatarProps {
  _id: string
  url: string
  createdAt: string
}

export interface ColumnProps {
  _id: number
  title: string
  avatar?: AvatarProps
  description: string
  author?: string
  createdAt?: string
}

export interface apiColumnProps {
  count: number
  pageSize: number
  currentPage: number
  list: ColumnProps[]
}
const getColumns = () => {
  axios.get('/columns').then((resp) => {
    store.commit('fetchColumns', resp.data.data)
  })
}

export default getColumns
