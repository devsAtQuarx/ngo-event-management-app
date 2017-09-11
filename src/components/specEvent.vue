<template>
  <div>
    {{$route.params.id}}
    <span>{{specEventFromDb}}</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default{
  data(){
    return {
      specEventFromDb: {}
    }
  },
  //methods
  methods:{
    getSpecEvent(){
      let vm = this
      this.$store.state.db.db.ref('events/' + this.$route.params.id)
      .once('value',function(snapshot){
        //console.log(snapshot.val())
        vm.specEventFromDb = snapshot.val()
      })
    }
  },
  //computed
  computed:{
    ...mapGetters([
    ])
  },
  beforeMount(){
    this.getSpecEvent()
  }
}
</script>
