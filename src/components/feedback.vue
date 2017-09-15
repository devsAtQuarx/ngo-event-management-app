<template>
  <div>
    feedback {{$route.params.id}}

    <span v-if="showFeedback.length == 0">wait...</span>
    <span v-else-if ="showFeedback == 'null'">
      <v-text-field
        label="Feedback"
        v-model="feedback"
        textarea
      ></v-text-field>
      <v-btn @click="submitFeedback">submit</v-btn>
    </span>
    <span v-else>
      {{showFeedback}}
    </span>

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
          console.log(snapshot.val())
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
