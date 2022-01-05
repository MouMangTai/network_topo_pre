import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect:'Home',
    component: ()=> import("@/layout/Layout"),
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: ()=> import("@/views/Home")
      },
      {
        path: 'Check',
        name: 'Check',
        component: () => import("@/views/Check")
      },
      {
        path: 'Config',
        name: 'Config',
        component: ()=> import("@/views/Config")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode:"hash"
})

export default router
