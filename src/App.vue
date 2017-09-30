<template >
  <v-app id="app">

    <header>

    </header>

    <main >
      <v-container fluid class="pa-0" >
        <transition name="fade" mode="out-in" v-on:after-enter="" appear>
          <router-view ></router-view>
        </transition>
        <v-snackbar
              v-if="snackState==true"
              :timeout="timeout"
              :success="context === 'success'"
              :info="context === 'info'"
              :warning="context === 'warning'"
              :error="context === 'error'"
              :primary="context === 'primary'"
              :secondary="context === 'secondary'"
              :multi-line="mode === 'multi-line'"
              :vertical="mode === 'vertical'"
              v-model="snackState"
            >
            {{this.$store.state.auth.pushNotText}}

            </v-snackbar>

      </v-container>

    </main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data(){
     return {
       vm:this,
       drawer:true,

       context: '',
       mode: '',
       timeout: 3000,
       text:'',

     }

},
computed:{
  ...mapGetters([
    'pushNotText','snackState'
  ])
}

}
</script>

<style>
#app{
  background: #f5f5f5;
}
.input-group__details {
    padding-top: 0px;
    min-height: 1px;
}
.application--light .input-group.input-group--textarea:not(.input-group--full-width) .input-group__input{
  border: 1px solid rgba(0,0,0,.38);
}
.application, .application>main>.container {
    min-height: 100vh;
    padding: 0;
}
.container{
  padding: 0px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
