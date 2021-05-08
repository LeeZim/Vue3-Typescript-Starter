import { Commit } from 'vuex'
import axios from './axios'

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
  image?: AvatarProps
  column: string
  author?: string
  title: string
  _id?: string
  key?: number
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

interface PropsData {
  code: number
  data: apiColumnProps | apiPostProps
  msg: string
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get<PropsData>(url)
  commit(mutationName, data.data)
}

const getColumns = (mutationName: string, commit: Commit) => {
  getAndCommit('/columns', mutationName, commit)
}

const getPosts = (columnId: string, mutationName: string, commit: Commit) => {
  getAndCommit(`/columns/${columnId}/posts`, mutationName, commit)
}

export { getColumns, getPosts, getAndCommit }
