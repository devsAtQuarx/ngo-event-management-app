<template>
  <div>
    {{showErrMsg}}
    feedback {{$route.params.id}}
    <input v-model="feedbackMsg" placeholder="write your feedback here !">
    <button @click="setFeedbacks">send</button>
  </div>
</template>

<script>
export default{

  data(){
    return{
      feedbackMsg : '',
      showErrMsg : ''
    }
  },

  methods:{

    getAllFeedbacks(){
        let vm = this
        this.$store.state.db.db.ref('feedback/'+this.$route.params.id+'/'+
          this.$store.state.auth.user.uid)
          .once('value',function(snapshot){
            console.log("loaded: "+snapshot.val())
            
            vm.showErrMsg = '' //loaded
          })
    },

    setFeedbacks(){
      //console.log(this.$route.params.id)
      this.$store.state.db.db.ref('feedback/'+this.$route.params.id+'/'+
        this.$store.state.auth.user.uid)
      .set(this.feedbackMsg)
    },

    checkIfUidIsLoaded(){
      //console.log(this.$store.state.auth.user.uid)
      if(this.$store.state.auth.user.uid == undefined){
        setTimeout(()=>{
          this.showErrMsg = 'Wait ...' // is uid is not loaded
          this.checkIfUidIsLoaded() // call again after 1 sec
        },1000)
      }else{
        this.getAllFeedbacks() // if loaded call main func
      }
    },

  },

  computed:{

  },

  beforeMount(){
    this.checkIfUidIsLoaded()
  }
}
</script>
