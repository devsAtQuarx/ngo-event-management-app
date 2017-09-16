<template>
  <div>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      light
      enable-resize-watcher
      absolute
    >
      <v-list dense>

        <v-list-tile @click="goToHome">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- arrange these in buttons -->
        <button @click='logOut'>Log out</button>
        <img :src="user.photoURL" style='height: 120px'><br>
        <span>{{user.displayName}} -
          {{user.email}} -
          {{user.uid}}
        </span>
        <button @click="goToMembershipForm">membership</button>
        <button @click="goToMyEvents">my events</button>
        <button @click="goToEventAttendance">event Attendance</button>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="indigo" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
        drawer: true
     }
   },

   //
   created() {

   },

  //
  methods: {

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

      this.$router.push('/membershipForm')
    }
  },

  //
  computed:{
    ...mapGetters([
      'user'
    ])
  }
};
</script>
