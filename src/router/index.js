import { createRouter, createWebHistory } from 'vue-router'
import User_manager from '../views/User_manager.vue'
import VueMini from '../views/VueMini.vue'
import Adminstrator_manager from '../views/Adminstrator_manager.vue'
const routes = [
  {
    path: '/',
    name: 'vuemini',
    component: VueMini
  },
  {
    path: '/user_manager',
    name: 'user_manager',
    component: User_manager
  },
  {
    path: '/adminstrator_manager',
    name: 'adminstrator_manager',
    component: Adminstrator_manager
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
