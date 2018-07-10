<template>
<v-card color="blue-grey darken-4" class="mb-5 animate zoomIn" height="80vh" style="overflow:scroll">
  <v-toolbar>
    <v-icon>mdi-console</v-icon>
    <v-toolbar-title>Task Logger</v-toolbar-title>
  </v-toolbar>
  <v-list class="my-0 py-0 pl-2 transparent" style="bottom:0px !important;position:absolute">
    <template v-for="(line, ind) in Log" class="my-0 py-0 transparent">
      <div :key="ind">
        <span style="opacity:0.7;font-style:italic">
          {{ line.time | moment("D/MM/YY, h:mm:ss a") }}
        </span>
        <span class="pl-2">
          <v-icon v-if="line.icon" :color="line.icon.color">{{line.icon.name}}</v-icon>
          {{line.msg}}
      </span>
      </div>
    </template>
  </v-list>
  
</v-card>
</template>
<script>
export default {
  props: ['Log']
}
</script>