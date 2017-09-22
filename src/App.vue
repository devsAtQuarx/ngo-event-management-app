<template>
  <v-app id="app">

    <header>

    </header>

    <main >
      <v-container fluid style="padding:0px">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app'
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

</style>
