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
        this.checkJoin(this.readData)
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
             vm.$router.push('/success')
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

            vm.$router.push('/success')
            vm.text="Your Attendance has been Registerd"
            vm.snackbar=true
            vm.loaded()

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

            vm.text="Thanks for attending this event"
            vm.$router.push('/success')
            vm.snackbar=true
            vm.loaded()

          })
      },
      loaded2 () {

            setTimeout(() => (this.snackbar= false), 5000)

      },

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
