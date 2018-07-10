<template>
  <v-layout>
      <div>
        <div v-for="(item, ind) in patient.profile.quickActions" :key="ind">
    <v-speed-dial v-if="(patient.profile.quickActions.opciones && item.opciones.length) > 0">
        <v-btn slot="activator" fab :color="item.color"><v-icon>{{item.icon}}</v-icon></v-btn>
        <v-btn fab :color="item.opciones.color"><v-icon>{{item.opciones.icon}}</v-icon></v-btn>        
    </v-speed-dial>
    <v-btn v-else fab :color="item.color"><v-icon>{{item.icon}}</v-icon></v-btn>        
        </div>
    </div>
  </v-layout>
</template>
<script>
export default {
  props: ['quickactions']
}
</script>
