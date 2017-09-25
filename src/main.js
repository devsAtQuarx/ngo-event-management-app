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

    const messaging = firebase.messaging()
    messaging.requestPermission()
      .then(function () {
        console.log('have permission')
        return messaging.getToken()
      })
      .then(function (token) {
        console.log(token)
        let registrationToken = token
        let topic = 'pushNots'
        // Subscribe the device corresponding to the registration token to the
        // topic.
        admin.messaging().subscribeToTopic(registrationToken, topic)
          .then(function(response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log("Successfully subscribed to topic:", response);
          })
          .catch(function(error) {
            console.log("Error subscribing to topic:", error);
          })
      })
      .catch(function () {
        console.log('err')
      })

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {

        //this.$router.push('/success')
        store.state.auth.user = user

        let tmpUserObj = {
          uid : user.uid,
          name : user.displayName,
          photoUrl : user.photoURL,
          email : user.email
        }


        store.state.db.db.ref('checkAuthDetail/' + user.uid)
          .once('value',function (snapshot) {
            //console.log(snapshot.val())
            if(snapshot.val() == null){
              //save user detail in database
              store.state.db.db.ref('userAuthDetail/')
                .push(tmpUserObj)

              //save user detail in database
              store.state.db.db.ref('checkAuthDetail/' + user.uid)
                .set(tmpUserObj)
            }
          })

      }else {
        this.$router.push('/')
      }
    });

  },
  store,
  el: '#app',
  render: h => h(App)
});
