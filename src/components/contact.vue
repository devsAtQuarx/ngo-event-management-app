<template>
  <div>
    contact us !
    name: <input v-model="conDet.name"><br>
    ph: <input v-model="conDet.ph"><br>
    email: <input v-model="conDet.email"><br>
    sub: <input v-model="conDet.sub"><br>
    desc: <input v-model="conDet.desc"><br>
    <button @click="submitForm">submit</button>
  </div>
</template>

<script>
  export default {

    //
    data(){
      return{
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
        }else{
          //
          window.alert('fields cannot be empty !')
        }

      }
    }
  }
</script>
