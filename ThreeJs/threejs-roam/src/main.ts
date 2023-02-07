import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import './styles/main.less'

import App from './App.vue'
import router from './routes/index'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
  .use(pinia)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app')

// FIXME: 开启vue devtools
const win: any = window

if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
}
