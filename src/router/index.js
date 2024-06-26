import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import WinnersPage from '../views/Winners.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/winners',
    name: 'Winners',
    component: WinnersPage
  }  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
