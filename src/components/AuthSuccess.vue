<template>
  <div>

    <div>
      <button @click='logOut'>Log out</button>
      <img :src="user.photoURL" style='height: 120px'><br>
      <span>{{user.displayName}} -
        {{user.email}} -
        {{user.uid}}
      </span>
    </div>

    <hr>

    <div>
      <!--put drawer/toolbar/nav etc .. -->
    </div>

    <div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import {mapGetters} from 'vuex'

export default {

  //
  data(){
     return {

     }
   },

   //
   created() {

   },

  //
  methods: {
    logOut() {
      firebase.auth().signOut();
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
