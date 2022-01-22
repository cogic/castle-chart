/**
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2022-01-17 18:18:12
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGridLayout from "vue-grid-layout";
createApp(App).use(store).use(router).use(VueGridLayout).mount('#app')
