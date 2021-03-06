import { createApp } from 'vue'
// import ElementPlus from 'element-plus' // 导入ElementUI
import App from './App.vue'

import router from './router/index' // 导入路由
import store from './store/index' // 导入状态管理
// import 'element-plus/lib/theme-chalk/index.css' // 导入ElementUI默认样式

const app = createApp(App)
app.use(router) // 挂载路由
app.use(store) // 挂载状态管理
// app.use(ElementPlus) // 挂载E-UI
app.mount('#app')
