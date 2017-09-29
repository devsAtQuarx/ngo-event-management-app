<template >
  <div class="pa-0">

    <v-container  grid-list-lg text-xs-center style="padding:0px">

    <v-layout  row wrap justify-space-around  >
   <v-flex  lg4 md10 v-for="(event,i) in eventsArr">
     <v-card>
       <v-card-media v-if="event.downloadUrl ==undefined" src="/static/img/icons/umangFoundation.jpg"
       @click="goToSpecEvent(event, i)"
       style="cursor:pointer"
       height="200px">
       </v-card-media>
       <v-card-media v-else :src="event.downloadUrl[0]" height="200px"
       style="cursor:pointer"
        @click="goToSpecEvent(event, i)">
       </v-card-media>
       <v-card-title primary-title>

           <div style="width:-webkit-fill-available">
                <v-btn icon style="float:right;" @click="notSwitch(event,i)"
                @click.native="snackbar = true"
                ><v-icon >notifications</v-icon></v-btn>

               <div class="headline mb-0" style="float:left">{{event.title}}</div>
         </div>


         <div>
         <v-icon class="icon_font">location_on</v-icon>
         <span v-for="i in event.venue.length" v-show="i < 25" class="grey--text">{{event.venue[i-1]}}</span>
         <span v-show="event.venue.length > 25" class="grey--text">...</span>
         </div>


       </v-card-title>

       <div>
         <span style="float:left" class="pl-3">
             <v-icon class="icon_font" >date_range</v-icon>
             <span class="grey--text">{{event.date}}</span>
        </span>

        <span class="pr-3">
         <v-icon class="icon_font" >access_time</v-icon>
         <span class="grey--text">{{event.time}}</span>
       </span>
       <span style="float:right" class="pr-3">
         <v-icon class="icon_font" style="font-size:15px">fa-hourglass-half</v-icon>
         <span class="grey--text">{{event.duration}}hrs</span>
       </span>
       </div>
       <v-card-actions class="pr-1">
         <v-spacer></v-spacer>
         <v-btn flat round outline class="grey--text" @click="goToSpecEvent(event, i)"
          style="font-size:10px;height:30px">
          <v-icon style="font-size:17px" class="mr-1">fa-list-alt</v-icon>

          <span >See Detail</span>
         </v-btn>

         <v-btn flat round outline class="grey--text" @click="checkIfMember(event,i)"
         @click.native="snackbar = true"
        style="font-size:10px;height:30px">
         <v-icon style="font-size:17px" class="mr-1">fa-calendar-check-o</v-icon>
          <span >Join Event</span>
       </v-btn>
     </v-card-text>
     <v-snackbar
           :timeout="timeout"
           :success="context === 'success'"
           :info="context === 'info'"
           :warning="context === 'warning'"
           :error="context === 'error'"
           :primary="context === 'primary'"
           :secondary="context === 'secondary'"
           :multi-line="mode === 'multi-line'"
           :vertical="mode === 'vertical'"
           v-model="snackbar"
         >
           {{ text }}
           <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
         </v-snackbar>

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
      snackbar: false,
      context: '',
      mode: '',
      timeout: 5000,
      text:'',
      notification:false,
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
          if(snapshot.val() != null){
            //cehck if already joined
            vm.$store.state.db.db.ref('joinedEvent/' + vm.$store.state.auth.user.uid)
              .orderByChild("eventKey").equalTo(event.key)
              .once('value',function (snapshot2) {
                console.log('already joined',snapshot2.val())


                if(snapshot2.val() != null){

                  //not turn on
                  vm.$store.state.db.db.ref('eventToken/' + event.key + '/' + vm.$store.state.auth.token)
                    .set(vm.$store.state.auth.user.uid)


                  //already joined => toast or popup


                  vm.text="You've Joined this event Already"
                }else{
                  vm.joinEvent(event,i)
                  vm.text="You Joined this event"
                }
              })
          }else{
              console.log("not a member")
           vm.text="Please fill the membership form to join event"

            //not a member =>
            //dialog or toast or redirect whatever !
          }
        })

    },


    //notSwitch
    notSwitch(event, i){
      let vm = this
      //not
      this.$store.state.db.db.ref('eventToken/' + event.key + '/' + this.$store.state.auth.token)
        .once('value',function(notStatus){
          if(notStatus.val() == null){
            //not turn on
            vm.notification=true
            console.log(vm.notification)
            vm.text="notifications turned on"
            vm.$store.state.db.db.ref('eventToken/' + event.key + '/' + vm.$store.state.auth.token)
              .set(vm.$store.state.auth.user.uid)
          }else{
            //turn off not
            //not turn on
            vm.notification=false
            console.log(vm.notification)
            vm.text="notifications turned off"
            vm.$store.state.db.db.ref('eventToken/' + event.key + '/' + vm.$store.state.auth.token)
              .remove()
          }
        })
    },

    //joinEvent
    joinEvent(event,i){

      let vm = this

      //check if already joined -> for which event are showing on screen
      //here !

      //not turn on
      this.$store.state.db.db.ref('eventToken/' + event.key + '/' + this.$store.state.auth.token)
        .set(vm.$store.state.auth.user.uid)

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
        vm.text="you joined this event"
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
