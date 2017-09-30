<template>
  <div >
    <!--cal user time !
    {{userUid}}-->
  <div class="grey--text display-1 text-xs-center">  {{showErrMsg}} </div>
    <v-layout justify-space-around>
    <span v-if="showErrMsg.length == 0" >
      <span v-if="detailArr.length != 0">
        <span class="memdetails_head grey--text display-1 text-xs-center">Total Time Spent By User In Events :-</span>
        <span class= "black--text display-1 text-xs-center">
          {{userTime.hr}} hours
          {{userTime.min}} minutes
        </span>
        <br>
        <br>
        <v-divider></v-divider>
        <span class="grey--text" style="font-weight:500;font-size:25px">Details: </span>
        <br>
        <span>
          <span style="float:left;font-weight:500;font-size:20px" class="grey--text">Event Key</span>
          <span style="float:right;font-weight:500;font-size:20px" class="grey--text">Duration</span>
        </span>
        <br>
        <br>
        <v-list v-for="i in detailArr"  style="background:#f5f5f5">
          <div style="width:100%;cursor:pointer" @click="goToSpecEvent(i.key)">

            <div style="font-weight:500">{{i.key}} </div>

           <div style="float:right;font-weight:500" >{{i.hr}}hr
           {{i.min}}min</div>
             <v-divider></v-divider>

         </div>
        </v-list>
      </span>
      <span v-else>
        <span class="memdetails_head grey--text display-1 text-xs-center">Total Time Spent By User In Events :-</span>
        <span >
          0 hours
          0 minutes
        </span>
      </span>
    </span>
  </v-layout>
  </div>
</template>

<script>
  import moment from 'moment'

  export default{

    //props
    //props:['userUid'],

    //data
    data(){
      return {
        userTime : {
          hr : '',
          min : ''
        },
        detailArr : [],
        showErrMsg : 'Please Wait Loading ..'
      }
    },

    //methods
    methods:{

      getUserAtt(){
        let vm = this
        console.log(vm.$store.state.auth.user.uid)
        this.$store.state.db.db.ref('attendanceUser/' + vm.$store.state.auth.user.uid )
          .once('value',function(snap){
            console.log(snap.val())
            vm.calTime(snap.val())
          })
      },

      calTime(events){
        //console.log(events)

        let sumHr = 0
        let sumMin = 0

        for(let i in events) {
          //console.log(events)
          //console.log(events[i].leave) //undefined
          if (events[i].leave != undefined) { //condition
            //console.log(events[i].leave + " | " + events[i].join)
            let endTime = moment(events[i].leave)
            let startTime = moment(events[i].join)
            //console.log(moment.duration(endTime.diff(startTime)).hours() + "|"
            // + moment.duration(endTime.diff(startTime)).minutes())

            sumHr += moment.duration(endTime.diff(startTime)).hours()
            sumMin += moment.duration(endTime.diff(startTime)).minutes()

            let tmpObj = {
              key: i,
              hr: moment.duration(endTime.diff(startTime)).hours(),
              min: moment.duration(endTime.diff(startTime)).minutes()
            }

            this.detailArr.push(tmpObj)
          }//if ends

        }//for ends

        //console.log(sumHr + "|" + sumMin)
        if(sumMin > 59){
          let newSumMin = sumMin%60
          let addSumHr = parseInt(sumMin/60)
          let newSumHr = sumHr + addSumHr

          if(newSumMin < 10){
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = newSumHr
            this.userTime.min ='0' + newSumMin
          }else{
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = newSumHr
            this.userTime.min = newSumMin
          }
        }else{

          if(sumMin < 10){
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = sumHr
            this.userTime.min ='0' + sumMin
          }else{
            //console.log(newSumHr + "hr " + newSumMin + "min")
            this.userTime.hr = sumHr
            this.userTime.min = sumMin
          }
        }

        this.showErrMsg = ''
      },

      goToSpecEvent(k){
        this.$router.push('/specEvent/'+ k)
      },

      //checkIfUidIsLoaded
      checkIfUidIsLoaded(){ //recursive
        //console.log(this.$store.state.auth.user.uid)
        if(this.$store.state.auth.user.uid == undefined){
          setTimeout(()=>{
            this.showErrMsg = 'Please Wait Loading ...' // is uid is not loaded
            this.checkIfUidIsLoaded() // call again after 1 sec
          },1000)
        }else{
          this.getUserAtt() // if loaded call main func
        }
      }

    },

    //beforeMount
    beforeMount(){
      this.checkIfUidIsLoaded()
    }

  }
</script>
