<template>
<v-app dark class="transparent BottomArrow" style="top:25px;left:25px">
      <v-slide-x-transition>
        <patientchart></patientchart>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-alert :type="alert.type" 
          :value="alert"
          transition="scale-transition" 
          style="position:fixed; bottom:30px; right: 20px;z-index:9999999;min-width:200px;border-raduis:20px" v-text="alert.text"></v-alert>
      </v-slide-x-transition>
</v-app>
</template>

<script>
import Views from '@/views'
export default {
  data () {
    return {
      alert: false,
      content: null,
      activeView: 'patientchart'
    }
  },
  mounted () {
    // if (!this.content) {
    //   console.log(`Loading ${this.activeView}`)
    //   this.loadView(this.activeView)
    // }
  },
  methods: {
    loadView (view) {
      if (Views[view]) {
        this.content = Views[view].default
      } else {
        this.content = Views['404'].default
      }
    }
  },
  components: {
    patientchart: require('@/views/patientchart').default,
    watermark: require('@/components/menus/watermark').default,
    titlebar: require('@/components/menus/titlebar').default
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
  @import url('https://cdn.materialdesignicons.com/2.4.85/css/materialdesignicons.min.css');
  @import url('https://use.fontawesome.com/releases/v5.0.6/css/all.css');
  /* Global CSS */
.system-bar {
  z-index: 10;
  -webkit-app-region: drag;
}
nav {
  -webkit-app-region: drag;
}
.toolbar {
  -webkit-app-region: drag;
}
.dragablewin {
  -webkit-app-region: drag !important;
}
.system-bar .icon {
  -webkit-app-region: none;
  cursor: pointer;
}
.loop {
  animation-iteration-count: infinite;
}
html {
  background: transparent;
;
}
body {
  background: transparent;

}
App {
  background: transparent;
}
#app {
  background: transparent;
  -webkit-app-region: none;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
}
.page-enter-active, .page-leave-active {
  transition: all .35s ease;
}
.page-enter, .page-leave-active {
  opacity: 0;
  transform: translateX(100px);
}

.list-complete-item {
  transition: all .34s ease;
  display: inline-block;
  margin-right: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 1em 0;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

::-webkit-scrollbar { 
  display: none; 
}
* {
  user-select: none;
  -webkit-user-select: none;
}
        #app {
          user-select: none;
          -webkit-user-select: none;
          
        }
        .barra {
          user-select: none;
          -webkit-user-select: none;
          -webkit-app-region: drag;
        }
        .leftMark {
          position:absolute;
          left:0;
          top:0;
          height: 100%;
          width:80px;
          -webkit-clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
          clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
        }
        .leftSide {
          position:fixed;
          bottom:0px;
          left:0px;
          transition: width .34s ease;
          height: 25px;
        }
        .rightSide {
          position:fixed;
          bottom:0px;
          right:0px;
          height: 25px;
          transition: width .34s ease;
        }
        .BottomArrowx {
          -webkit-clip-path: polygon(0 0, 100% 0, 100% 95%, 50% 98%, 0 95%);
          clip-path: polygon(0 0, 100% 0, 100% 95%, 50% 98%, 0 95%);
        }
      
</style>
