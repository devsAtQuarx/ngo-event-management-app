<template>
  <div>
    <div class="preload" v-if="this.submitting==true" ></div>
     <div v-else>
    <v-layout row wrap justify-space-around class="pa-3">
      <v-flex xs12 md8 lg8>
    <p class="grey--text text-xs-center display-1">contact us !</p>
    <v-text-field
      class="ma-2"
      label="Name"
      prepend-icon="person"
      v-model="conDet.name"
      required
    ></v-text-field>
    <v-text-field
      class="ma-2"
      label="Phone No."
      prepend-icon="phone"
      v-model="conDet.ph"
      required
    ></v-text-field>
    <v-text-field
      class="ma-2"
      label="Email"
      prepend-icon="email"
      v-model="conDet.email"
      required
    ></v-text-field>
    <v-text-field
      class="ma-2"
      label="Subject"
      prepend-icon="subject"
      v-model="conDet.sub"
      required
    ></v-text-field>
    <v-text-field
      class="ma-2"
      textarea
      label="Description"
      v-model="conDet.desc"
      required
    ></v-text-field>

  </v-flex>
  </v-layout>

    <v-btn
      small
       grey
       dark
       right
       bottom
       fixed
       slot="activator"
       @click="submitForm"
       @click.native="snackbar = true"
       class="create-button"
       >Submit
     </v-btn>
   </div>
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
  export default {

    //
    data(){
      return{
        submitting:false,
        snackbar: false,
        context: '',
        mode: '',
        timeout: 3000,
        text:'',
        conDet: {
          name : '',
          ph: '',
          email : '',
          sub : '',
          desc : ''
        }
      }
    },

    //
    methods:{
      loaded () {
        setTimeout(() => (this.clear()), 3000)
      },
      clear(){
        this.conDet.name=''
        this.conDet.ph=''
        this.conDet.email=''
        this.conDet.sub=''
        this.conDet.desc=''
        this.submitting=false

        console.log("clear")
      },
      submitForm(){
        let vm = this

        if(vm.conDet.name.length != 0 &&
            vm.conDet.ph.length != 0  &&
              vm.conDet.email.length != 0 &&
                vm.conDet.sub.length != 0 &&
                  vm.conDet.desc.length != 0 ){
          vm.conDet.loginName = vm.$store.state.auth.user.displayName
          vm.conDet.loginEmail = vm.$store.state.auth.user.email
          vm.$store.state.db.db.ref('contactUsMail/' + vm.$store.state.auth.user.uid)
            .set(vm.conDet)
            vm.text="Your Form is being Submitted"
            this.submitting=true
            console.log(this.submitting)
            this.loaded()
        }else{
          //
          vm.text="Please fill all the fields"
        }

      }
    }
  }
</script>
<style>
.preload {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  margin: -42px 0 0 -12px;
  background: #1976d2;
  transform: rotate(45deg);
  animation: spin 1s infinite linear;
  z-index: 7000;
}
@keyframes spin {
	0% { -webkit-transform:rotate(0deg); }
	100% { -webkit-transform:rotate(360deg); }
}
</style>
