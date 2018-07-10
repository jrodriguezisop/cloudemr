<template>
<div>
  <v-toolbar color="orange lighten-2" dark tabs dense>
        
        <v-tabs   right color="transparent"  slider-color="transparent" v-model="tabModel">
          <v-tab v-for="i in Object.keys(tables)" :key="i" :href="`#tab-${i}`" >{{ i }} </v-tab>
        </v-tabs>
      </v-toolbar>
    <v-tabs-items v-model="tabModel"> 
      <v-tab-item v-for="i in Object.keys(tables)" :key="i" :id="`tab-${i}`" >
        <v-card flat color="blue-grey lighten-2">
          <v-data-iterator content-tag="v-layout" row wrap :items="Object.keys($DB.getRows(i))" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination">
            <v-flex slot="item" slot-scope="props" class="py-3" xs12 sm6 md4 lg3>
              <v-card class="mx-1 my-1 elevation-12" style="max-height:65vh;min-height:65vh">
                <v-card-title class="my-0 py-1"><h4>{{i}} - <strong>{{ props.item }}</strong></h4></v-card-title>
                
                  <tree-view style="max-height:65vh;min-height:65vh" :data="tables[i][props.item]" class="blue-grey py-2" :options="{maxDepth: 10, modifiable: false}" dark></tree-view>
                
              </v-card>
            </v-flex>
          </v-data-iterator>
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
      tables: {},
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    }
  },
  mounted () {
    this.$Bus.$on('TABLES', () => {
      this.tables = this.$DB.local
    })
  }
}
</script>
