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
import {mapGetters} from 'vuex'


Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueRouter)

 new Vue({

  router,
  computed:{
    ...mapGetters([
      'pushNotText'
    ])
  },

  created() {
     let vm=this
    //auth Change Check
    const firebaseApp = firebase.initializeApp(config)

    //db
    store.state.db.db = firebaseApp.database()
    store.state.db.storage = firebase.storage()

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {

        //this.$router.push('/success')
        store.state.auth.user = user
        console.log(user)


        let tmpUserObj = {
          uid : user.uid,
          name : user.displayName,
          photoUrl : user.photoURL,
          email : user.email
        }

        //check if user is logging for 1st time
        store.state.db.db.ref('checkAuthDetail/' + user.uid).once('value',function (checkUserSnap) {
          if(checkUserSnap.val() == null){
            //not present 1st time //send verfication mail

            if(user.providerData[0].providerId == 'password'){
              console.log('ok pswd')
              var actionCodeSettings = {
                url: 'https://umang-foundation.firebaseapp.com/?email=' + user.email,
                //handleCodeInApp: true
              };
              firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
                .then(function() {
                  console.log('ver email sent !') // Verification email sent.
                })
                .catch(function(error) {
                  // Error occurred. Inspect error.code.
                  console.log('ver email not sent !', error)
                });

            }
          }
        })

        console.log(user.providerData[0].providerId)


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

            //firebase messaging
            const messaging = firebase.messaging()
            messaging.requestPermission()
              .then(function () {
                console.log('have permission')
                return messaging.getToken()
              })
              .then(function (token) {
                console.log(token)
                store.state.auth.token = token

                store.state.db.db.ref('tokens/' + token)
                  .set(user.email)
                store.state.db.db.ref('checkTokens/' + user.uid)
                  .push(token)

              })
              .catch(function () {
                console.log('err')
              })

            messaging.onMessage(function(payload) {
              console.log("Message received. ", payload);

          //  window.alert(payload.data.title + ' , ' + payload.data.content)
            store.state.auth.pushNotText=payload.data.title + ' , ' + payload.data.content
            store.state.auth.snackState=true
             //kuchu challenge toast
             vm.loaded()

              // ...
            })
            //

          })

      }else {
        this.$router.push('/')
      }
    });

  },
  methods:{
    loaded(){
      setTimeout(() => (store.state.auth.snackState = false), 6000)


    }
  },
  store,
  el: '#app',

  render: h => h(App)
});
