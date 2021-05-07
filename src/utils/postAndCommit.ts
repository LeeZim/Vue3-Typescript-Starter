import { Commit } from 'vuex'
import axios from './axios'

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return { data }
}

export default postAndCommit
