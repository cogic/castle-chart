import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGridLayout from 'vue-grid-layout'
import api from '@/api'

const app = createApp(App)
app.config.globalProperties.$API = api
app.use(store).use(router).use(VueGridLayout).mount('#app')
