import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import AuthSuccess from '@/components/AuthSuccess'
import events from '@/components/events'
import specEvent from '@/components/specEvent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Auth },
    {
      path: '/success',  component: AuthSuccess, children:[
        { path:'' , component : events},
        { path :'/specEvent/:id' , component : specEvent}
      ]
    }
  ]
})
