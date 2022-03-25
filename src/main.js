import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGridLayout from 'vue-grid-layout'
import theApi from '@/api'

const app = createApp(App)
app.config.globalProperties.$API = theApi
app.use(store).use(router).use(VueGridLayout).mount('#app')
