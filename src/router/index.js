import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Auth from '@/components/Auth'
import AuthSuccess from '@/components/AuthSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',component: Hello},
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess }
  ]
})
