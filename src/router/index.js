import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import AuthSuccess from '@/components/AuthSuccess'
import events from '@/components/events'
import specEvent from '@/components/specEvent'

import membershipForm from '@/components/membershipForm'
import page1 from '@/components/membershipForm/page1'
import page2 from '@/components/membershipForm/page2'
import lastPage from '@/components/membershipForm/lastPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Auth },
    {
      path: '/success',  component: AuthSuccess, children:[
        { path:'' , component : events},
        { path :'/specEvent/:id' , component : specEvent},
        {path : '/membershipForm' , component : membershipForm ,
          children:[
            {path:'' , component:page1},
            {path:'page2' , component:page2},
            {path:'lastPage' , component:lastPage}
          ]
        }
      ]
    }
  ]
})
