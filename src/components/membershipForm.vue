<template>
  <div>

    <router-view></router-view>
  </div>
</template>

<script>

export default{

  //data
  data() {
    return {
      
    }
  },

  //methods
  methods:{

  },

  //components
  components:{

  }
}
</script>

<style>
.junk{
  visibility: hidden;
}

.text-field-required-warning{
  color:#E55350;
  font-size:11px;
}

.text-field-optional-warning{
  color:grey;
  font-size:11px;
}
.stepper, .stepper__header {
    box-shadow: none!important;
}
</style>
