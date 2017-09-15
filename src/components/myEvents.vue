<template>
  <div>
    <span v-if="Object.keys(showMyEvents).length == 0">
      {{showErrMsg}}
    </span>
    <span v-else>
      <li v-for="event in showMyEvents">
        {{event}}
        <button @click="eventDetail(event)">event detail</button>
        <button @click="addFeedback(event)">feedback</button>
      </li>
    </span>
  </div>
</template>
<script>
export default{

  data(){
    return{
      showMyEvents : [],
      showErrMsg : ''
    }
  },

  methods :{
    getMyEvents(){
      let vm = this
      this.$store.state.db.db.ref('joinedEvent/'+this.$store.state.auth.user.uid)
      .once('value',function(snapshot){
        //console.log(snapshot.val())
        if(snapshot.val() != null){
          let myEvents = snapshot.val()
          console.log(Object.keys(myEvents))
          for(let k in Object.keys(myEvents)){
            vm.$store.state.db.db.ref('events/'+ Object.keys(myEvents)[k])
            .once('value',function(snapshot2){
              //console.log(snapshot2.val())
              let tmpObj = snapshot2.val()
              tmpObj.key = Object.keys(myEvents)[k]
              vm.showMyEvents.push(tmpObj)
            })
          }
        }else{
          vm.showErrMsg = 'You hav not joined any events yet !'
        }
      })
    },

    eventDetail(event){
      //console.log(event.key)
      this.$router.push('/specEvent/'+ event.key)
    },

    addFeedback(event){
      //console.log(event.key)
      this.$router.push('/feedback/'+event.key)
    },

    checkIfUidIsLoaded(){
      //console.log(this.$store.state.auth.user.uid)
      if(this.$store.state.auth.user.uid == undefined){
        setTimeout(()=>{
          this.showErrMsg = 'Wait ...' // is uid is not loaded
          this.checkIfUidIsLoaded() // call again after 1 sec
        },1000)
      }else{
        this.getMyEvents() // if loaded call main func
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
