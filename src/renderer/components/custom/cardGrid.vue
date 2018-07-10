<template>
  <div>
    <v-flex xs12 sm6 md6 lg4 v-for="(item, index) in this.$t(path)" :key="index">
      <v-card :height="item.height" :class="item.class" :style="'animation-delay:' + index * 100 + 'ms'">
        <v-card-media :src="item.media.bg" :height="item.media.height" :class="item.media.color + ' pl-2 pt-1'">
          <div v-for="(ic, icindex) of item.media.icons" :key="icindex">
            <v-icon x-large>
              {{ic}}
            </v-icon>
          </div>
        </v-card-media>
        <v-card-title primary-title class="my-0 pt-2">
          <div>
            <h3 class="headline ">{{item.title}}</h3>
            <v-divider dark></v-divider>
            <div style="text-align:justify;opacity:0.7">
              {{item.description}}
            </div>
          </div>
        </v-card-title>
        <v-card-actions style="position:absolute;bottom:3px;right:5px">
          <v-spacer></v-spacer>
          <v-btn flat color="primary" :to="item.to">Execute</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>
<script>
export default {
  props: ['path']
}
</script>