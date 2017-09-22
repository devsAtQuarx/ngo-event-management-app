<template>
  <div >
    <v-layout row wrap justify-space-around class="events_layout pt-0">
   <v-flex xs12 md10 lg10 v-for="(event,i) in eventsArr" class="primary  elevation-2 pt-0 ma-1">
        <v-card class="blue-grey darken-4 white--text pt-0 xs-only " >
          <v-container fluid grid-list-lg style="">
            <v-layout row wrap>
              <v-flex xs7>
                <div>
                  <div class="headline">{{event.title}}</div>
                  <v-icon class="white--text icon_font">location_on</v-icon>
                  <span>{{event.venue}}</span>


                </div>
                <br>

                <div >
                  <v-icon class="white--text icon_font" >date_range</v-icon>
                  <span>{{event.date}}</span>
                  <v-spacer></v-spacer>
                  <v-icon class="white--text icon_font">access_time</v-icon>
                  <span>{{event.time}}</span>

                </div>

              </v-flex>
              <v-flex xs5>
                 <v-card-media
                    src="/static/img/icons/umangFoundation.jpg"
                    height="125px"
                    contain
                    v-if="event.downloadUrl ==undefined"
                  ></v-card-media>

                  <v-card-media
                     :src="event.downloadUrl[0]"
                     height="125px"
                     contain
                     v-else
                   ></v-card-media>


              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
        <v-tabs dark grow icons>
         <v-tabs-bar class="cyan" style="height:55px">


               <v-tabs-item style="filter: opacity(0.7);" class="pl-0 pr-0">
                 <v-list-tile @click="goToSpecEvent(event, i)" class="pl-0 pr-0">
                   <v-icon class="icon_font">fa-list-alt</v-icon>
                 </v-list-tile>
                 <span style="font-size:10px;margin-top:-15px">See Details</span>
               </v-tabs-item>


             <v-tabs-item class="pl-0 pr-0">
               <!--v-dialog v-model="dialog" lazy absolute-->
               <v-list-tile @click=""  class="pl-0 pr-0">
                 <v-icon class="icon_font">fa-calendar-check-o</v-icon>
               </v-list-tile>
               <span style="font-size:10px;margin-top:-15px">Join Event</span>
               <!--v-card>
                 <v-card-title>
                   <div class="headline">Use Google's location service?</div>
                 </v-card-title>
                 <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                   <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
                 </v-card-actions>
               </v-card>
             </v-dialog-->
             </v-tabs-item>


       </v-tabs-bar>
     </v-tabs>

      </v-flex>

    </v-layout >


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
        this.$store.state.db.db.ref('events/').limitToLast(3)
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
.events_layout{
 margin-top: -4.9vh !important;
}


main {
    padding-top: 0px !important;
}

</style>
