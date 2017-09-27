<template>
  <div>
    <div class="preload" v-if="showFeedback.length == 0"></div>
    <span v-else-if ="showFeedback == 'null'">
      <v-text-field
        label="Feedback"
        v-model="feedback"
        textarea
        class="pl-2 pr-2"
      ></v-text-field>
      <v-btn
        small
         grey
         dark
         right
         bottom
         fixed
         slot="activator"
         @click="submitFeedback"
         class="create-button"
         >Submit
       </v-btn>

    </span>
    <div v-else class="pl-3 pr-3">
    <p class="grey--text display-1 text-xs-center">You've submitted your feedback</p>
    <p  class="grey--text">
      {{showFeedback}}
    </p>
  </div>
  </div>
</template>

<script>
export default{

  data(){
    return{
      feedback:''  ,
      showFeedback : ''
    }
  },

  methods:{

    submitFeedback(){
      //console.log("submitFeedback")
      //to check -> for user
      this.$store.state.db.db.ref('feedbackUser/' + this.$route.params.id + '/' +
        this.$store.state.auth.user.uid).set(this.feedback)

      //for Admin
      let tmpObj = {
        uid : this.$store.state.auth.user.uid ,
        feedback : this.feedback
      }
      this.$store.state.db.db.ref('feedbackAdmin/' + this.$route.params.id)
      .push(tmpObj)

      //route , toast
      this.$router.go(-1)
    },

    getFeedback(){
      let vm=this
      this.$store.state.db.db.ref('feedbackUser/' + this.$route.params.id + '/' +
        this.$store.state.auth.user.uid)
        .once('value',function(snapshot){
          //console.log(snapshot.val())
          if(snapshot.val() == null){
            vm.showFeedback = 'null'
          }else{
            vm.showFeedback = snapshot.val()
          }
        })
    },

    //checkIfUidIsLoaded
    checkIfUidIsLoaded(){ //recursive
      //console.log(this.$store.state.auth.user.uid)
      if(this.$store.state.auth.user.uid == undefined){
        setTimeout(()=>{
          this.showErrMsg = 'Wait ...' // is uid is not loaded
          this.checkIfUidIsLoaded() // call again after 1 sec
        },1000)
      }else{
        this.getFeedback() // if loaded call main func
      }
    }

  },

  computed:{

  },

  beforeMount(){
    this.checkIfUidIsLoaded()
  }
}
</script>
<style>
.preload {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  margin: -42px 0 0 -12px;
  background: #1976d2;
  transform: rotate(45deg);
  animation: spin 1s infinite linear;
  z-index: 7000;
}
@keyframes spin {
	0% { -webkit-transform:rotate(0deg); }
	100% { -webkit-transform:rotate(360deg); }
}
</style>
