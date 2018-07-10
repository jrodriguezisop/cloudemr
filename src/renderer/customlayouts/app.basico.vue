<template>
<v-layout>
    <v-card app fluid class="barra elevation-12" style="background-color:#0B202F;position:absolute;height:100vh;width:100vw;border-radius:20px 10px 10px 10px;overflow:hidden;z-index:200">
      <v-toolbar dense flat clipped app dark class="blue-grey darken-4">
        <div class="blue-grey darken-2 leftMark" style="left:10px !important;z-index:999997" ></div>
        <div class="blue-grey darken-3 leftMark" style="left:10px !important;z-index:999998" ></div>
        <div class="blue-grey darken-1 leftMark elevation-12" style="left:0px;z-index:999999"></div>
        <v-toolbar-title class="pl-5" style="margin-left:100px;">
          {{title}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span> | </span>
        <windowButtons></windowButtons>
      </v-toolbar>
      <!-- <drawer :activeView.sync="activeView"></drawer> -->
      <v-content fluid fill-heigth 
        style="position:absolute;top:50px;left:0px;bottom:0px;right:0px;overflow:hidden" 
        class="mx-0 my-0 py-0 px-4">
        <v-slide-y-transition> 
          <slot name="contenido">
            <span>Cargando contenido ...</span>
          </slot>
        </v-slide-y-transition> 
      </v-content>
      <watermark style="z-index:9999 !important;position:absolute;bottom:10px;right:10px"></watermark>  
    </v-card>
    </v-layout>
  </template>
  <script>
  export default {
    props: ['title'],
    components: {
      windowButtons: () => require('@/components/menus/windowbox').default,
      watermark: () => require('@/components/menus/watermark').default
    }
  }
  </script>