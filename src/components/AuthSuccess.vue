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
       drawer:true
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

    goToMembershipForm(){
      // if already a member & member ship no is generated just show in popup
      //or routte to a page to show membership no/or change detail
      let vm = this
      this.$store.state.db.db.ref('membershipDetail/' + this.$store.state.auth.user.uid)
        .once('value',function(snapshot){
          console.log(snapshot.val())
          if(snapshot.val() == null){
            vm.$router.push('/membershipForm')
          }else{
            vm.$router.push('/membershipForm/lastPage')
          }
        })

    }
  },

  //
  computed:{
    ...mapGetters([
      'user','fullscreenDialog'
    ])
  },
  beforeMount(){
    this.vm
  }
};
</script>
