import Axios from 'axios'
// import { ElMessage } from 'element-plus'
import store from '../store/index'

const baseURL = 'https://apis.imooc.com/api/'

const axios = Axios.create({
  baseURL,
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    store.commit('setLoading', true)
    if (response.method === 'post') {
      response.data = { ...response.data, icode: '0370D0ADAC459408' }
    } else {
      response.params = {
        ...response.params,
        icode: '0370D0ADAC459408'
      }
    }

    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    store.commit('setLoading', false)
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    return response
  },
  (error) => {
    const respError = error.response.data.error
    store.commit('setError', { status: true, message: respError })
    store.commit('setLoading', false)
    // if (error.response && error.response.data) {
    //   const code = error.response.status
    //   const msg = error.response.data.message
    //   ElMessage.error(`Code: ${code}, Message: ${msg}`)
    //   console.error(`[Axios Error]`, error.response)
    // } else {
    //   ElMessage.error(`${error}`)
    // }
    return Promise.reject(respError)
  }
)

export default axios

// 使用参考
// <template></template>
// <script lang="ts">
//   import { defineComponent } from 'vue'
//   import axios from '../utils/axios'

//   export default defineComponent({
//     setup() {
//       axios
//         .get('/users/XPoet')
//         .then((res) => {
//           console.log('res: ', res)
//         })
//         .catch((err) => {
//           console.log('err: ', err)
//         })
//     }
//   })
// </script>
