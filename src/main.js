import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import api from './axios'


const app = createApp(App)
const apikey = 'sk-f50b90816e404b579c86be7ec382e23e'
app.use(axios)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')

app.config.globalProperties.$api = api