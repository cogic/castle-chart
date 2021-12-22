/**
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-22 14:21:25
 * @Description:
 * @FilePath: \castle-chart\src\router\index.js
 */
import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/views/Home.vue')
const DataSource = () => import('@/views/DataSource.vue')
const ChartStore = () => import('@/views/ChartStore.vue')
const PanelStore = () => import('@/views/PanelStore.vue')
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/data-source',
    name: 'DataSource',
    component: DataSource,
  },
  {
    path: '/chart-store',
    name: 'ChartStore',
    component: ChartStore,
  },
  {
    path: '/panel-store',
    name: 'PanelStore',
    component: PanelStore,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
