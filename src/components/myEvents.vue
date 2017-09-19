<template>
  <div>
    <span v-if="myEvents.length == 0">
      {{showErrMsg}}
    </span>
    <span v-else>
      <li v-for="(event,i) in myEvents">
        {{event}}
        <button @click="eventDetail(event)">event detail</button>
        <button @click="addFeedback(event)">feedback</button>
      </li>
      <button @click="loadMoreMyEvents">load more my events</button>
    </span>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default{

  data(){
    return{
      showErrMsg : ''
    }
  },

  methods :{

    //getMyEvents
    getMyEvents(){
      let vm = this
      this.$store.state.db.db.ref('joinedEvent/'+this.$store.state.auth.user.uid).limitToLast(3)
      .once('value',function(snapshot){
        //console.log(snapshot.val())
        if(snapshot.val() != null){
          vm.showMyEventsOnDom(snapshot.val())
        }else{
          vm.showErrMsg = 'You hav not joined any events yet !'
        }
      })
    },

    showMyEventsOnDom(fetchedEvents){
      let tempMyEvent = []
      //just making it an array
      for(let i in fetchedEvents){
        //console.log(i)
        fetchedEvents[i].key = i
        tempMyEvent.push(fetchedEvents[i])
      }
      tempMyEvent.reverse()
      //console.log(tempMyEvent)
      if(this.$store.state.events.myEvents.length == 0){
        this.$store.state.events.myEvents = tempMyEvent
      }else{
        for(let i in tempMyEvent){
          if(tempMyEvent[i].key ==
            this.$store.state.events.myEvents[this.$store.state.events.myEventCount].key){
            //do nothing
            // 1 key will b eq cz querying 3
          }else{
            this.$store.state.events.myEvents.push(tempMyEvent[i])
          }
        }
      }
      //console.log(fetchedEvents)
    },

    loadMoreMyEvents(){
      //console.log("loadMore")
      let vm = this
      this.$store.state.events.myEventCount += 2
      //console.log(this.$store.state.events.myEventCount)
      //console.log(vm.$store.state.events.myEvents[this.$store.state.events.myEventCount])
      if(vm.$store.state.events.myEvents[this.$store.state.events.myEventCount]
          != undefined ){
        //console.log(vm.$store.state.events.myEvents[this.$store.state.events.myEventCount].key)
        this.$store.state.db.db.ref('joinedEvent/'+this.$store.state.auth.user.uid)
        .orderByKey()
        .endAt(vm.$store.state.events.myEvents[this.$store.state.events.myEventCount].key)
        .limitToLast(3)
        .once('value',function(snapshot){
          //console.log(snapshot.val())
          //
          vm.showMyEventsOnDom(snapshot.val())
        })
      }else{
        // nothing to load more
        //count --
      }
    },

    //eventDetail
    eventDetail(event){
      //console.log(event.key)
      this.$router.push('/specEvent/'+ event.eventKey)
    },

    //addFeedback
    addFeedback(event){
      //console.log(event.key)
      this.$router.push('/feedback/'+event.eventKey)
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
        this.getMyEvents() // if loaded call main func
      }
    }

  },

  //updated
  updated(){
    let vm = this
    this.$store.state.db.db.ref('joinedEvent/'+this.$store.state.auth.user.uid)
    .limitToLast(1)
    .on('value',function(snapshot){
      if(snapshot.val() != null) {
        //console.log(Object.keys(snapshot.val())[0])
        //console.log(vm.$store.state.events.eventsArr[0].key)

        if (Object.keys(snapshot.val())[0] == vm.$store.state.events.myEvents[0].key) {
          //console.log("eq")
          //do nothing
        } else {
          //console.log("not eq")

          let newEvent = snapshot.val()
          newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
          vm.$store.state.events.myEvents.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
          vm.$store.state.events.myEventCount += 1

          //toast
        }
      }
    })
  },

  //computed
  computed:{
    ...mapGetters([
      'myEvents'
    ])
  },

  //beforeMount
  beforeMount(){
    if(this.$store.state.events.myEvents.length == 0){
        this.checkIfUidIsLoaded()
    }
  }

}
</script>
