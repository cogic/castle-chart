/**
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-07 23:23:38
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'
const Master = () => import('@/views/Master.vue')
const MainPage = () => import('@/components/master/main/MainPage.vue')
const Home = () => import('@/components/master/main/content/Home.vue')
const DataStore = () => import('@/components/master/main/content/DataStore.vue')
const ChartStore = () => import('@/components/master/main/content/ChartStore.vue')
const PanelStore = () => import('@/components/master/main/content/PanelStore.vue')
const DataTab = () => import('@/components/master/tab/DataTab.vue')
const ChartTab = () => import('@/components/master/tab/ChartTab.vue')
const PanelTab = () => import('@/components/master/tab/PanelTab.vue')
const UserSign = () => import('@/views/UserSign.vue')
const SignIn = () => import('@/components/sign/SignIn.vue')
const SignUp = () => import('@/components/sign/SignUp.vue')
const Test = () => import('./test.vue')
const Preview = ()=> import('@/views/Preview.vue')
const PreviewClean = ()=> import('@/views/PreviewClean.vue')

const routes = [
  {
    path: '/test',
    component: Test,
  },
  {
    path: '/',
    redirect: '/master',
  },
  {
    path: '/master',
    component: Master,
    redirect: '/master/main',
    children: [
      {
        path: 'main',
        name: 'MainPage',
        component: MainPage,
        redirect: '/master/main/home',
        children: [
          {
            path: 'home',
            name: 'Home',
            component: Home,
          },
          {
            path: 'data-store',
            name: 'DataStore',
            component: DataStore,
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
        ],
      },
      {
        path: 'tab/data/:tabkey',
        name: 'DataTab',
        component: DataTab,
      },
      {
        path: 'tab/chart/:tabkey',
        name: 'ChartTab',
        component: ChartTab,
      },
      {
        path: 'tab/panel/:tabkey',
        name: 'PanelTab',
        component: PanelTab,
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
  {
    path: '/preview/:type/:viewid',
    name:'Preview',
    component: Preview,
  },
  {
    path: '/preview-clean/:type/:viewid',
    name:'PreviewClean',
    component: PreviewClean,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
