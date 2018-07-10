<template>
  <v-layout fluid style="position:absolute;right:0px;width:30vh;z-index:9999">
    <v-btn dense flat icon small @click="minimize()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-minimize</v-icon></v-btn>
    <v-btn dense flat icon small v-if="!$electron.remote.getCurrentWindow().isMaximized()" @click="maximize()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-maximize</v-icon></v-btn>
    <v-btn dense flat icon small v-if="$electron.remote.getCurrentWindow().isMaximized()" @click="restore()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-restore</v-icon></v-btn>
    <v-btn dense flat icon small @click="close()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-close</v-icon></v-btn>
  </v-layout>
</template>
<script>
export default {}
</script>