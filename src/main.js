/**
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-11 15:20:34
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGridLayout from "vue-grid-layout";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).use(store).use(router).use(VueGridLayout).use(ElementPlus).mount('#app')
