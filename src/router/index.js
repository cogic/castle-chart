/**
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2021-12-23 19:05:58
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
const Master = () => import('@/views/Master.vue')
const Home = () => import('@/components/master/main/Home.vue')
const DataSource = () => import('@/components/master/main/DataSource.vue')
const ChartStore = () => import('@/components/master/main/ChartStore.vue')
const PanelStore = () => import('@/components/master/main/PanelStore.vue')
const Tab = () => import('@/components/master/Tab.vue')
const UserSign = () => import('@/views/UserSign.vue')
const SignIn = () => import('@/components/sign/SignIn.vue')
const SignUp = () => import('@/components/sign/SignUp.vue')
const routes = [
  {
    path: '/',
    redirect: '/master',
  },
  {
    path: '/master',
    component: Master,
    redirect: '/master/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'data-source',
        name: 'DataSource',
        component: DataSource,
      },
      {
        path: 'chart-store',
        name: 'ChartStore',
        component: ChartStore,
      },
      {
        path: 'panel-store',
        name: 'PanelStore',
        component: PanelStore,
      },
      {
        path: 'tab/:tabnum',
        name: 'Tab',
        component: Tab,
      },
    ],
  },
  {
    path: '/sign',
    component: UserSign,
    redirect: '/sign/in',
    children: [
      {
        path: 'in',
        component: SignIn,
      },
      {
        path: 'up',
        component: SignUp,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
