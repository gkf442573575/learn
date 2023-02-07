import * as VueRouter from 'vue-router'

import { useCounterStore } from '@/store/counter'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: () => import('../views/todos.vue')
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const counter = useCounterStore()
  console.log('count >>>', counter.count)
  next()
})

export default router