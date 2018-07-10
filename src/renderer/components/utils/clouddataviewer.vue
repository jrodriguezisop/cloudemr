<template>
<div>
  <v-toolbar color="orange lighten-2" dark tabs dense>
        
        <v-tabs   right color="transparent"  slider-color="transparent" v-model="tabModel">
          <v-tab v-for="i in tables" :key="i" :href="`#tab-${i}`" >{{ i }} </v-tab>
        </v-tabs>
      </v-toolbar>
    <v-tabs-items v-model="tabModel"> 
      <v-tab-item v-for="i in tables" :key="i" :id="`tab-${i}`" >
        <v-card flat color="blue-grey lighten-2"></v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tabModel: '',
      tables: ['none']
    }
  }
}
</script>
