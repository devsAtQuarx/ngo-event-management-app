<template>
  <div>


      <v-navigation-drawer
        persistent
        v-model="vm.$store.state.auth.drawer"
        light
        enable-resize-watcher
        overflow
        class="grey lighten-4"
        style="z-index:5"

>

      <v-list dense class="grey lighten-4">

        <v-list-tile avatar @click="">
          <v-list-tile-avatar>
               <img v-bind:src="user.photoURL"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.displayName}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>



        <v-list class="pt-0 grey lighten-4" dense >
          <v-divider></v-divider>
          <v-list-tile @click="goToHome">
           <v-list-tile-action>
             <v-icon>home</v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title>Home</v-list-tile-title>
           </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goToMembershipForm">
           <v-list-tile-action>
             <v-icon style="font-size:18px">fa-address-card</v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title>Membership</v-list-tile-title>
           </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goToMyEvents">
           <v-list-tile-action>
             <v-icon>events</v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title>My Events</v-list-tile-title>
           </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goToEventAttendance">
           <v-list-tile-action>
             <v-icon style="font-size:18px">fa-camera</v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title>Attendance</v-list-tile-title>
           </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="goToTimeSpentInEvents">
            <v-list-tile-action>
              <v-icon style="font-size:20px">fa-book</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Time Spent In Events</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="goToDonate">
            <v-list-tile-action>
              <v-icon style="font-size:20px">fa-book</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Donate</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="goToContact">
            <v-list-tile-action>
              <v-icon style="font-size:20px">fa-address-book</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="goToAboutUsPage">
           <v-list-tile-action>
             <v-icon style="font-size:20px">fa-book</v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title>About Us</v-list-tile-title>
           </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logOut">
           <v-list-tile-action>
             <v-icon style="font-size:20px">fa-sign-out</v-icon>
           </v-list-tile-action>
           <v-list-tile-content>
             <v-list-tile-title>Logout</v-list-tile-title>
           </v-list-tile-content>
          </v-list-tile>
        </v-list>


      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="white grey--text" style="z-index:4" dark fixed>
       <v-toolbar-side-icon class="grey--text" @click.stop="vm.$store.state.auth.drawer = !vm.$store.state.auth.drawer"></v-toolbar-side-icon>

       <v-toolbar-title>Toolbar</v-toolbar-title>
     </v-toolbar>

    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>


  </div>
</template>

<script>
import firebase from 'firebase'
import {mapGetters} from 'vuex'


export default {

  //
  data(){
     return {
       vm:this,
       drawer:true,
       snackbar: false,
       context: '',
       mode: '',
       timeout: 3000,
       text:'',

     }

   },

   //
   created() {

   },

  //
  methods: {
    goToAboutUsPage(){
      this.$router.push('/aboutUs')
    },
    goToMyEvents(){
      this.$router.push('/myEvents')
    },

    logOut() {
      firebase.auth().signOut();
    },

    goToHome(){
      this.$router.push('/success')
    },

    goToEventAttendance(){
      this.$router.push('/eventAttendance')
    },

    goToContact(){
      this.$router.push('/contact')
    },

    goToDonate(){
      location.href = 'https://www.paypal.me/umangfoundation'
    },

    goToTimeSpentInEvents(){
      this.$router.push('/calUserTime')
    },

    goToMembershipForm(){
      // if already a member & member ship no is generated just show in popup
      //or routte to a page to show membership no/or change detail

      console.log(this.$store.state.auth.user.emailVerified)
      if(this.$store.state.auth.user.emailVerified == true) {

        let vm = this
        this.$store.state.db.db.ref('membershipDetail/' + this.$store.state.auth.user.uid)
          .once('value', function (snapshot) {
            //console.log(snapshot.val())
            if (snapshot.val() == null) {
              vm.$router.push('/membershipForm')
            } else {
              console.log(snapshot.val().membershipNo.length)
              if(snapshot.val().membershipNo.length == 0){
                vm.$router.push('/membershipForm')
              }else{
                vm.$router.push('/membershipForm/lastPage')
              }
            }
          })
      }else{
        this.snackbar=true
        this.text="Please Verify Your email First"
        this.loaded2()
      }

    },
    loaded2 () {

          setTimeout(() => (this.snackbar= false), 5000)

    },
  },

  //
  computed:{
    ...mapGetters([
      'user','fullscreenDialog',
    ])
  },
  beforeMount(){
    this.vm
  }
};
</script>
