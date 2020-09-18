import Vue from 'vue'
import VueRouter from 'vue-router'

import Pos from '@/views/Pos.vue'
Vue.use(VueRouter)
console.log(process.env.BASE_URL=='/')
const routes = [
  {
    path: '/',
    name: 'Pos',
    component: Pos
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
