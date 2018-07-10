<template>
      <v-badge overlap right bottom >
        <v-avatar tile v-if="profile && profile.displayPic" size="200px" color="light-blue darken-4">
          <img class="px-1 py-1" :src="profile.displayPic"/>
        </v-avatar>
        <span  slot="badge">
            <v-icon ligth large >
              mdi-camera
            </v-icon>
        </span>
      </v-badge>
</template>
<script>
export default {
  props: ['profile']
}
</script>