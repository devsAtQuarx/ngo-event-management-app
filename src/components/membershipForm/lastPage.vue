<template>
  <div>
  <p class="text-xs-center ">  Your Membership No is </p>
  <br>
    <p class="grey--text text-xs-center" style="font-weight:bolder"> {{showMembershipNo}}</p>
  {{detail}}


    <v-btn
      small
       grey
       dark
       right
       bottom
       fixed
       slot="activator"
       @click="goToHome"
       class="create-button"
       >Home
     </v-btn>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default{

  //data
  data(){
    return {
      showMembershipNo : '',
      detail: {}
    }
  },

  //methods
  methods:{

    getMemNo(){
      let vm = this
      this.$store.state.db.db.ref('membershipDetail/' + this.$store.state.auth.user.uid + "/" +
       "membershipNo/").once('value',function(snapshot){
         //console.log(snapshot.val())
         vm.showMembershipNo = snapshot.val()
        vm.getDetail()
       })
    },

    getDetail(){
      let vm = this
      this.$store.state.db.db.ref('membershipDetail/' + this.$store.state.auth.user.uid)
        .once('value',function(snapshot){
        //console.log(snapshot.val())
        vm.detail = snapshot.val()
      })
    },

    goToHome(){
      this.$router.push('/success')
    }
  },

  //computed
  computed : {
    ...mapGetters([

    ]),
  },

  //beforeMount
  beforeMount(){
    this.getMemNo()
  }

}
</script>

<style scoped>

</style>
