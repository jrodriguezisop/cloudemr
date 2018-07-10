<template>
    <v-toolbar dense flat clipped app dark class="blue-grey darken-4">
      <div class="blue-grey darken-2 leftMark" style="left:10px !important;z-index:999997" ></div>
              <div class="blue-grey darken-3 leftMark" style="left:10px !important;z-index:999998" ></div>
              <div class="blue-grey darken-1 leftMark elevation-12" style="left:0px;z-index:999999"></div>
        <v-toolbar-title class="pl-5" style="margin-left:100px;">
         {{$t(`viewtitles.${activeView}`)}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon  medium style="text-shadow:1.5px 1.5px 1px #000000" class="pr-2">{{states[state]}}</v-icon> 
         <span class="pr-3">{{statemsg}}</span> | 
        <v-btn dense flat icon small @click="minimize()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-minimize</v-icon></v-btn>
        <v-btn dense flat icon small v-if="!$electron.remote.getCurrentWindow().isMaximized()" @click="maximize()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-maximize</v-icon></v-btn>
        <v-btn dense flat icon small v-if="$electron.remote.getCurrentWindow().isMaximized()" @click="restore()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-restore</v-icon></v-btn>
        <v-btn dense flat icon small @click="close()" class="mx-0 py-0"> <v-icon color="orange">mdi-window-close</v-icon></v-btn>
    </v-toolbar>
</template>
<script>
export default {
  props: ['activeView'],
  data () {
    return {
      statemsg: '',
      state: 'ok',
      states: {
        ok: 'mdi-cloud',
        search: 'mdi-cloud-search',
        sucess: 'mdi-cloud-check',
        sync: 'mdi-cloud-sync',
        downloading: 'mdi-cloud-download',
        uploading: 'mdi-cloud-upload',
        empty: 'mdi-cloud-outline',
        tagged: 'mdi-cloud-tags',
        coded: 'mdi-cloud-braces',
        bad: 'mdi-cloud-off-outline'
      },
      viewIcons: {
        remoteshell: 'mdi-console-line'
      }
    }
  },
  mounted () {
    // this.$Bus.$on('WSS_STATE', status => {
    //   this.statemsg = status
    //   switch (status) {
    //     case 'Connecting':
    //       this.state = 'sync'
    //       break
    //     case 'Connected':
    //       this.state = 'ok'
    //       break
    //     case 'Error':
    //       this.state = 'bad'
    //       break
    //   }
    // })
  },
  methods: {
    Reload () {
      this.$electron.remote.getCurrentWindow().reload()
    },
    minimize () {
      this.$electron.remote.getCurrentWindow().minimize()
    },
    maximize () {
      this.$electron.remote.getCurrentWindow().maximize()
    },
    restore () {
      this.$electron.remote.getCurrentWindow().restore()
    },
    close () {
      this.$electron.remote.getCurrentWindow().close()
    }
  }
}
</script>