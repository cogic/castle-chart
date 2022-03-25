import { createRouter, createWebHistory } from 'vue-router'
const Master = () => import('@/views/master/Master.vue')
const Main = () => import('@/views/master/main/Main.vue')
const Home = () => import('@/views/master/main/MainHome.vue')
const DataStore = () => import('@/views/master/main/MainDataStore.vue')
const ChartStore = () => import('@/views/master/main/MainChartStore.vue')
const PanelStore = () => import('@/views/master/main/MainPanelStore.vue')
const DataTab = () => import('@/views/tab/DataTab.vue')
const ChartTab = () => import('@/views/tab/ChartTab.vue')
const PanelTab = () => import('@/views/tab/PanelTab.vue')
const Sign = () => import('@/views/sign/Sign.vue')
const SignIn = () => import('@/views/sign/SignIn.vue')
const SignUp = () => import('@/views/sign/SignUp.vue')
const Preview = () => import('@/views/preview/Preview.vue')
const PreviewClean = () => import('@/views/preview/PreviewClean.vue')
const Management = () => import('@/views/management/Management.vue')

const routes = [
  {
    path: '/',
    name:'Default',
    redirect: '/master',
  },
  {
    path: '/management',
    name:'Management',
    component: Management,
  },
  {
    path: '/master',
    name:'Master',
    component: Master,
    redirect: '/master/main',
    children: [
      {
        path: 'main',
        name: 'Main',
        component: Main,
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
    name:'Sign',
    component: Sign,
    redirect: '/sign/in',
    children: [
      {
        path: 'in',
        name:'SignIn',
        component: SignIn,
      },
      {
        path: 'up',
        name:'SignUp',
        component: SignUp,
      },
    ],
  },
  {
    path: '/preview/:type/:viewid',
    name: 'Preview',
    component: Preview,
  },
  {
    path: '/preview-clean/:type/:viewid',
    name: 'PreviewClean',
    component: PreviewClean,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
