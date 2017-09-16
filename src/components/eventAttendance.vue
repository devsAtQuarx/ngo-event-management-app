<template>
  <div>
    eventAttendance
    <qrcode-reader :active="stillActive" @capture="onCapture">
      {{ readData }}
    </qrcode-reader>

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
        readData: ''
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
        this.$store.state.db.db.ref('attendanceEvents/'+ key + '/' + this.$store.state.auth.user.uid + '/join')
          .set(moment().format())
          .then(function(snapshot){
            //console.log(snapshot.val())
            //toast => joined timer
            vm.$router.push('/success')
          })
      },

      setLeaveTime(key){
        let vm = this
        this.$store.state.db.db.ref('attendanceEvents/'+ key + '/' + this.$store.state.auth.user.uid + '/leave')
          .set(moment().format())
          .then(function(snapshot){
            //console.log(snapshot.val())
            //toast => joined timer
            vm.$router.push('/success')
          })
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
