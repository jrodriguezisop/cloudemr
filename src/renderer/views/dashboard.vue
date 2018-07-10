<template>
 
</template>

<script>
export default {
  name: 'dashboard',
  components: {
    parallaxwithCenteredContent: require('@/components/custom/parallaxwithCenteredContent').default,
    cards: require('@/components/custom/cardGrid').default
  },
  data () {
    return {
      prefix: 'dashboard.',
      itemsPath: `${this.prefix}.links`,
      tabModel: '',
      stepper: {},
      steps: [],
      content: []
    }
  },
  mounted () {
    console.log('dashboard loaded')
  }
}
</script>
