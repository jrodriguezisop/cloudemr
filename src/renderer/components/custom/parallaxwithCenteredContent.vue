<template>
  <v-layout>
    <v-parallax :src="$t(prefix + 'bg')" jumbotron :gradient="$t(prefix + 'gradient')"  style="width:100%;position:absolute;">
      <v-container fill-height>
        <v-layout >
          <v-flex xs10>
            <h3 class="display-1">
              
              <v-icon x-large style="opacity:0.7" :class="'pr-2 ' + $t(prefix + 'txtcolor')">{{$t(prefix + 'icon')}}</v-icon>
              {{$t(prefix + 'title')}}
            </h3>
            <span :class="'subheading ' + $t(prefix + 'txtcolor')">{{$t(prefix + 'subtitle')}}</span>
            <v-divider class="my-3"></v-divider>
          </v-flex>
          <v-flex xs5>
            <slot name="actions">
              
            </slot>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    <centeredContainer class="mt-5 pt-4">
      <slot>
        nothing to show
      </slot>
    </centeredContainer>
  </v-layout>
</template>
<script>
export default {
  props: ['prefix'],
  components: {
    centeredContainer: require('@/components/custom/centeredContainer').default
  }
}
</script>