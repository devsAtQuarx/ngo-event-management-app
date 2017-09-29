<template>
  <div>
    <p class="grey--text display-1 text-xs-center">Scan the QR code for Attendance</p>
    <v-layout justify-space-around>
    <qrcode-reader :active="stillActive" @capture="onCapture">
      {{ readData }}
    </qrcode-reader>
  </v-layout>
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
  </div>
</template>

<script>
  import { QrcodeReader } from 'vue-qrcode-reader'
  import moment from 'moment'
  export default {
    //data
    data(){
      return{
        stillActive: true,
        readData: '',
        snackbar: false,
        context: '',
        mode: '',
        timeout: 3000,
        text:''
      }
    },
    //methods
    methods:{
      onCapture (payload) {
        this.readData = payload.result
        this.stillActive = false
        this.checkIfUidIsLoaded(this.readData)
      },
      checkJoin(key){
        let vm = this
        this.$store.state.db.db.ref('attendanceEvents/'+ key + '/' + this.$store.state.auth.user.uid + '/join')
          .once('value',function(snapshot){
            if(snapshot.val() == null){
              //set/ join attendance
              vm.setJoinTime(key)
            }else{
              //check for live
              vm.checkLeave(key)
            }
          })
      },
      checkLeave(key){
        let vm = this
        this.$store.state.db.db.ref('attendanceEvents/'+ key + '/' + this.$store.state.auth.user.uid + '/leave')
          .once('value',function(snapshot){
           if(snapshot.val() == null){
             //leaveing time
             vm.setLeaveTime(key)
           }else{
             // do nothing ! => already attended the event (toast & route) timer
             //or crete a dialog => if yes call below func
             /**** toast ****/
             window.alert('you already left the event !')
             //setTimeout(function(){
               // do this after 3s =>
               vm.$router.push('/success')
             //}, 3000)
           }
          })
      },
      setJoinTime(key){
        let vm = this
        let setTime = moment().format()
        this.$store.state.db.db.ref('attendanceEvents/'+ key + '/' + this.$store.state.auth.user.uid + '/join')
          .set(setTime)
          .then(function(snapshot){
            //console.log(snapshot.val())
            //toast => joined timer
            vm.$store.state.db.db.ref('attendanceUser/' + vm.$store.state.auth.user.uid + '/' + key + '/join')
              .set(setTime)
              .then(function (snap2) {
                /**** toast ****/
                window.alert('you just joined an event !')
                //setTimeout(function(){
                  // do this after 3s =>
                  vm.$router.push('/success')
                //}, 3000)
              })
          })
      },
      setLeaveTime(key){
        let vm = this
        let setTime = moment().format()
        this.$store.state.db.db.ref('attendanceEvents/'+ key + '/' + this.$store.state.auth.user.uid + '/leave')
          .set(setTime)
          .then(function(snapshot){
            //console.log(snapshot.val())
            //toast => joined timer
              vm.$store.state.db.db.ref('attendanceUser/' + vm.$store.state.auth.user.uid + '/' + key + '/leave')
                .set(setTime)
                .then(function (snap2) {
                  window.alert('you just left this event !')
                  //setTimeout(function(){
                    // do this after 3s =>
                    vm.$router.push('/success')
                  //}, 3000)
                })
          })
      },
      loaded2 () {
            setTimeout(() => (this.snackbar= false), 5000)
      },
      checkEventJoin(key){
        let vm = this
        this.$store.state.db.db.ref('checkPeopleInEvent/' + key + '/' + this.$store.state.auth.user.uid)
          .once('value',function(snap){
            //window.alert('st' + snap.val())  //no no no  not this , for test
            if(snap.val() != null){
              vm.checkJoin(key)
            }else{
              window.alert('you have not joined the event yet !')
              //setTimeout(function(){
                // do this after 3s =>
                vm.$router.push('/success')
              //}, 3000)
            }
          })
      },
      //checkIfUidIsLoaded
      checkIfUidIsLoaded(key){ //recursive
        //console.log(this.$store.state.auth.user.uid)
        if(this.$store.state.auth.user.uid == undefined){
          setTimeout(()=>{
            this.showErrMsg = 'Please Wait Loading ...' // is uid is not loaded
            this.checkIfUidIsLoaded() // call again after 1 sec
          },1000)
        }else{
          this.checkEventJoin(key) // if loaded call main func
        }
      }
    },
    //computed
    computed:{
    },
    //beforeMount
    beforeMount(){
    },
    //components
    components:{
      'qrcode-reader': QrcodeReader
    }
  }
</script>
