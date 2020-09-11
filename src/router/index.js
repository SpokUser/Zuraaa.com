import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Início',
    component: Home
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
