import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import firebaseui from 'firebaseui';
import router from './router'
import {config} from './firebase/config'
import {store} from './store'
import Vuetify from 'vuetify'
import '../node_modules/firebaseui/dist/firebaseui.css'
import '../node_modules/vuetify/dist/vuetify.min.css'
import './assets/css/lib/googleFont.css'


Vue.use(VueRouter)
Vue.use(Vuetify)


Vue.use(VueRouter)

new Vue({
  router,
  created() {

    //auth Change Check
    const firebaseApp = firebase.initializeApp(config)

    //db
    store.state.db.db = firebaseApp.database()
    store.state.db.storage = firebase.storage()

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {

        //this.$router.push('/success')
        store.state.auth.user = user

      } else {
        this.$router.push('/')
      }
    });

  },
  store,
  el: '#app',
  render: h => h(App)
});
