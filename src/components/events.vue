<template>
  <div>

    <li v-for="(event,i) in eventsArr">
      {{event}}
      <button @click="goToSpecEvent(event, i)">See Detail</button>
    </li>

    <button @click="loadMoreEvents()">
      load more events ...
    </button>

  </div>
</template>


<script>
import {mapGetters} from 'vuex'

export default{

  //data
  data(){
    return{

    }
  },

  //methods
  methods:{

    //goToSpecEvent
    goToSpecEvent(event, i){
      this.$router.push('/specEvent/'+event.key)
    },

    //showEvents
    getEvents(){
        let vm = this
        this.$store.state.db.db.ref('events/').limitToLast(3)
        .once('value',function(snapshot){
          vm.showEventsOnDom(snapshot.val())
        })
    },

    //showEventsOnDom
    showEventsOnDom(fetchedEvents){
      let tempEventArr = []
      for(let i in fetchedEvents){
        fetchedEvents[i].key = i
        tempEventArr.push(fetchedEvents[i])
      }
      tempEventArr.reverse()
      if(this.$store.state.events.eventsArr.length == 0){
        this.$store.state.events.eventsArr = tempEventArr
      }else{
        for(let i in tempEventArr){
          if(tempEventArr[i].key ==
            this.$store.state.events.eventsArr[this.$store.state.events.count].key){
            //do nothing
          }else{
            this.$store.state.events.eventsArr.push(tempEventArr[i])
          }
        }
      }
      //console.log(fetchedEvents)
    },

    //reverseGotData
    reverseGotData(){

    },

    //loadMore
    loadMoreEvents(){
      //console.log("loadMore")
      let vm = this
      this.$store.state.events.count += 2
      //console.log(this.$store.state.events.count)
      if(vm.$store.state.events.eventsArr[this.$store.state.events.count]
          != undefined ){
        this.$store.state.db.db.ref('events/')
        .orderByKey()
        .endAt(vm.$store.state.events.eventsArr[this.$store.state.events.count].key)
        .limitToLast(3)
        .once('value',function(snapshot){
          //console.log(snapshot.val())
          //
          vm.showEventsOnDom(snapshot.val())
        })
      }else{
        // nothing to load more
      }
    }
  },

  //mounted
  beforeMount(){

    if(this.$store.state.events.eventsArr.length == 0){
      this.getEvents()
    }

  },

  //updated
  updated(){
    let vm = this
    this.$store.state.db.db.ref('events/')
    .limitToLast(1)
    .on('value',function(snapshot){
      //console.log(Object.keys(snapshot.val())[0])
      //console.log(vm.$store.state.events.eventsArr[0].key)

      if(Object.keys(snapshot.val())[0] == vm.$store.state.events.eventsArr[0].key){
        console.log("eq")
        //do nothing
      }else{
        console.log("not eq")

        let newEvent = snapshot.val()
        newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
        vm.$store.state.events.eventsArr.splice(0,0,newEvent[Object.keys(snapshot.val())[0]])
        vm.$store.state.events.count += 1

        //toast
      }

    })
  },

  //computed
  computed:{
    ...mapGetters([
      'eventsArr'
    ])
  },
}
</script>
