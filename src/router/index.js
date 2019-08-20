import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home/Home'
import Index from '@/components/home/index'
import Order from '@/components/home/order'
import Archives from '@/components/home/archives'
import Refer from '@/components/home/refer'


Vue.use(Router)

export default new Router({
  routes: [{
    path: 'home',
    component: Home,
    children: [
      { path: '/home', component: Index },
      { path: '/home/order', component: Order },
      { path: '/home/archives', component: Archives },
      { path: '/home/refer', component: Refer },
    ]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: Login
  }]
})