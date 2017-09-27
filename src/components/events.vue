<template >
  <div class="pa-0">

    <v-container  grid-list-lg text-xs-center style="padding:0px">
    <v-layout  row wrap justify-space-around  >
   <v-flex  lg4 md10 v-for="(event,i) in eventsArr">
     <v-card>
       <v-card-media v-if="event.downloadUrl ==undefined" src="/static/img/icons/umangFoundation.jpg" height="200px">
       </v-card-media>
       <v-card-media v-else :src="event.downloadUrl[0]" height="200px">
       </v-card-media>
       <v-card-title primary-title>
         <div>
           <div class="headline mb-0">{{event.title}}</div>
           <v-icon class="icon_font">location_on</v-icon>
           <span v-for="i in event.venue.length" v-show="i < 25" class="grey--text">{{event.venue[i-1]}}</span>
           <span v-show="event.venue.length > 25" class="grey--text">...</span>
         </div>



       </v-card-title>
       <div>
         <span style="float:left" class="pl-3">
             <v-icon class="icon_font" >access_time</v-icon>
             <span class="grey--text">{{event.time}}</span>
        </span>

        <span>
         <v-icon class="icon_font" >date_range</v-icon>
         <span class="grey--text">{{event.date}}</span>
       </span>
       <span style="float:right" class="pr-3">
         <v-icon class="icon_font" style="font-size:15px">fa-hourglass-half</v-icon>
         <span class="grey--text">{{event.duration}}hrs</span>
       </span>
       </div>
       <v-card-actions class="pr-1">
         <v-spacer></v-spacer>
         <v-btn flat icon class="grey--text" @click="goToSpecEvent(event, i)" v-tooltip:top="{ html: 'See Detail' }"><v-icon>fa-list-alt</v-icon></v-btn>
         <v-btn flat icon class="grey--text" @click="checkIfMember(event,i)" v-tooltip:top="{ html: 'Join Event' }"><v-icon>fa-calendar-check-o</v-icon></v-btn>
       </v-card-actions>
     </v-card>
   </v-flex>
 </v-layout>
</v-container>

    <infinite-loading
      v-if="eventsArr.length >= 3 && showLoader == true"
      :on-infinite="onInfinite"
      ref="infiniteLoading"
      class = "infiniteLoading"
    >
    </infinite-loading>






  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default{

  //data
  data(){
    return{
      dialog: false
    }
  },

  //methods
  methods:{

    checkIfMember(event,i){
      let vm = this
      this.$store.state.db.db.ref('membershipDetail/'+this.$store.state.auth.user.uid)
        .once('value',function(snapshot){
          console.log('memberShip',snapshot.val())
          if(snapshot.val != null){
            //cehck if already joined
            vm.$store.state.db.db.ref('joinedEvent/' + vm.$store.state.auth.user.uid)
              .orderByChild("eventKey").equalTo(event.key)
              .once('value',function (snapshot2) {
                console.log('already joined',snapshot2.val())
                if(snapshot2.val() != null){
                  //already joined => toast or popup
                }else{
                  vm.joinEvent(event,i)
                }
              })
          }else{
            //not a member =>
            //dialog or toast or redirect whatever !
          }
        })
    },

    //joinEvent
    joinEvent(event,i){
      //check if already joined -> for which event are showing on screen
      //here !

      let tmpUserDetail = {
        uid:this.$store.state.auth.user.uid,
        name:this.$store.state.auth.user.displayName
      }

      this.$store.state.db.db.ref('peopleInEvent/'+event.key)
        .push(tmpUserDetail)

      this.$store.state.db.db.ref('checkPeopleInEvent/'+ event.key + '/' +this.$store.state.auth.user.uid)
        .set(tmpUserDetail)

      let tmpObj = {
         eventKey  : event.key ,
         title : event.title
      }

      this.$store.state.db.db.ref('joinedEvent/'+this.$store.state.auth.user.uid)
        .push(tmpObj)

        //toast joined
    },

    //goToSpecEvent
    goToSpecEvent(event, i){
      this.$router.push('/specEvent/'+event.key)
    },

    //showEvents
    getEvents(){
        let vm = this
        this.$store.state.db.db.ref('events/').limitToLast(6)
        .once('value',function(snapshot){
          vm.reverseFetchedEventsOrder(snapshot.val())
        })
    },

    //reverseFetchedEventsOrder
    reverseFetchedEventsOrder(fetchedEvents){
      let tempEventArr = []
      for(let i in fetchedEvents){
        fetchedEvents[i].key = i
        tempEventArr.push(fetchedEvents[i])
      }
      tempEventArr.reverse()
      this.showEventsOnDom(tempEventArr)
    },

    showEventsOnDom(tempEventArr){
      //
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

    getJoinedStatus(event,i){
      console.log(event.key)
      let vm = this
      let joinedStatus = false
      this.$store.state.db.db.ref('checkPeopleInEvent/'+ event.key + '/' +this.$store.state.auth.user.uid )
      .once('value',function(snapshot) {
        //null if not joined
        //console.log(snapshot.val())
        if(snapshot.val() == null) {
          //no joined
          vm.joinEvent(event,i)
          //toast => joined !
        }else{
          //joined
          //console.log(snapshot.val())
          //toast => already joined
        }
      })
    },

    //loadMore
    loadMoreEvents(){
      //console.log("loadMore")
      let vm = this
      this.$store.state.events.count += 5
      //console.log(this.$store.state.events.count)
      if(vm.$store.state.events.eventsArr[this.$store.state.events.count]
          != undefined ){
        this.$store.state.db.db.ref('events/')
        .orderByKey()
        .endAt(vm.$store.state.events.eventsArr[this.$store.state.events.count].key)
        .limitToLast(6)
        .once('value',function(snapshot){
          //console.log(snapshot.val())
          //
          vm.reverseFetchedEventsOrder(snapshot.val())
          vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
        })
      }else{
        // nothing to load more
       this.$store.state.events.showLoader = false
      }
    },
    onInfinite() {
      this.loadMoreEvents()
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
      if(snapshot.val() != null) {
        //console.log(Object.keys(snapshot.val())[0])
        //console.log(vm.$store.state.events.eventsArr[0].key)
        console.log(vm.$store.state.events.eventsArr)
        if(vm.$store.state.events.eventsArr.length != 0) {
          if (Object.keys(snapshot.val())[0] == vm.$store.state.events.eventsArr[0].key) {
            //console.log("eq")
            //do nothing
          } else {
            //console.log("not eq")

            let newEvent = snapshot.val()
            newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
            vm.$store.state.events.eventsArr.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
            vm.$store.state.events.count += 1

            //toast
          }
        }else{
          let newEvent = snapshot.val()
          newEvent[Object.keys(snapshot.val())[0]].key = Object.keys(snapshot.val())[0]
          vm.$store.state.events.eventsArr.splice(0, 0, newEvent[Object.keys(snapshot.val())[0]])
          vm.$store.state.events.count += 1
        }
      }
    })
  },

  //computed
  computed:{
    ...mapGetters([
      'eventsArr','showLoader'
    ]),

  },
  components:{
   InfiniteLoading
 }
}
</script>

<style scoped>

.icon_font{
  font-size:19px
}

main {
    padding-top: 0px !important;
}


</style>
