import Vue from 'vue'
import Router from 'vue-router'

//import Auth from '@/components/Auth'
//import AuthSuccess from '@/components/AuthSuccess'
//import events from '@/components/events'
//import specEvent from '@/components/specEvent'
//import myEvents from '@/components/myEvents'
//import feedback from '@/components/feedback'
//import eventAttendance from '@/components/eventAttendance'
//import about from '@/components/about'
//import contact from '@/components/contact'
//import calUserTime from '@/components/calUserTime'

//import membershipForm from '@/components/membershipForm'
//import page1 from '@/components/membershipForm/page1'
//import page2 from '@/components/membershipForm/page2'
//import page3 from '@/components/membershipForm/page3'
//import page4 from '@/components/membershipForm/page4'
//import lastPage from '@/components/membershipForm/lastPage'

Vue.use(Router)

//lazy laoding
const Auth = resolve => {
  require.ensure(['@/components/Auth'],()=>{
    resolve(require('@/components/Auth'));
  });
};
const AuthSuccess = resolve => {
  require.ensure(['@/components/AuthSuccess'],()=>{
    resolve(require('@/components/AuthSuccess'));
  });
};
const events = resolve => {
  require.ensure(['@/components/events'],()=>{
    resolve(require('@/components/events'));
  });
};
const specEvent = resolve => {
  require.ensure(['@/components/specEvent'],()=>{
    resolve(require('@/components/specEvent'));
  });
};
const myEvents = resolve => {
  require.ensure(['@/components/myEvents'],()=>{
    resolve(require('@/components/myEvents'));
  });
};
const feedback = resolve => {
  require.ensure(['@/components/feedback'],()=>{
    resolve(require('@/components/feedback'));
  });
};
const eventAttendance = resolve => {
  require.ensure(['@/components/eventAttendance'],()=>{
    resolve(require('@/components/eventAttendance'));
  });
};
const about = resolve => {
  require.ensure(['@/components/about'],()=>{
    resolve(require('@/components/about'));
  });
};
const contact = resolve => {
  require.ensure(['@/components/about'],()=>{
    resolve(require('@/components/about'));
  });
};
const calUserTime = resolve => {
  require.ensure(['@/components/calUserTime'],()=>{
    resolve(require('@/components/calUserTime'));
  });
};
const membershipForm = resolve => {
  require.ensure(['@/components/membershipForm'],()=>{
    resolve(require('@/components/membershipForm'));
  });
};
const page1 = resolve => {
  require.ensure(['@/components/membershipForm/page1'],()=>{
    resolve(require('@/components/membershipForm/page1'));
  });
};
const page2 = resolve => {
  require.ensure(['@/components/membershipForm/page2'],()=>{
    resolve(require('@/components/membershipForm/page2'));
  });
};
const page3 = resolve => {
  require.ensure(['@/components/membershipForm/page3'],()=>{
    resolve(require('@/components/membershipForm/page3'));
  });
};
const page4 = resolve => {
  require.ensure(['@/components/membershipForm/page4'],()=>{
    resolve(require('@/components/membershipForm/page4'));
  });
};
const lastPage = resolve => {
  require.ensure(['@/components/membershipForm/lastPage'],()=>{
    resolve(require('@/components/membershipForm/lastPage'));
  });
};

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
