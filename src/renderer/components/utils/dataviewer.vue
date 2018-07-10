<template>
<div>
  <v-toolbar color="orange" dark tabs dense>
        <v-icon large style="opacity:0.6">mdi-view-list</v-icon><span class="headline" light>DataViewer</span>
        <v-tabs   right color="transparent"  slider-color="transparent" v-model="tabModel">
          <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`" >{{ i }} </v-tab>
        </v-tabs>
      </v-toolbar>
    <v-tabs-items v-model="tabModel"> 
      <v-tab-item v-for="i in tabs" :key="i" :id="`tab-${i}`" >
        <v-card flat color="blue-grey lighten-2">
          <component :is="i" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tabModel: '',
      tabs: ['memory', 'stored']
    }
  },
  components: {
    memory: require('@/components/utils/localdataviewer').default,
    stored: require('@/components/utils/clouddataviewer').default
  }
}
</script>
