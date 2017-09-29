import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import AuthSuccess from '@/components/AuthSuccess'
import events from '@/components/events'
import specEvent from '@/components/specEvent'
import myEvents from '@/components/myEvents'
import feedback from '@/components/feedback'
import eventAttendance from '@/components/eventAttendance'
import about from '@/components/about'
import contact from '@/components/contact'
import calUserTime from '@/components/calUserTime'

import membershipForm from '@/components/membershipForm'
import page1 from '@/components/membershipForm/page1'
import page2 from '@/components/membershipForm/page2'
import page3 from '@/components/membershipForm/page3'
import page4 from '@/components/membershipForm/page4'
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
        { path:'/myEvents' , component:myEvents},
        { path:'/contact' , component:contact},
        { path:'/feedback/:id',component:feedback},
        { path:'/calUserTime',component:calUserTime},
        { path:'/eventAttendance', component:eventAttendance},
        { path:'/aboutUs', component:about},
        { path : '/membershipForm' , component : membershipForm ,
          children:[
            { path:'' , component:page1},
            { path:'page2' , component:page2},
            { path:'page3' , component:page3},
            { path:'page4' , component:page4},
            { path:'lastPage' , component:lastPage}
          ]
        }
      ]
    }
  ]
})
