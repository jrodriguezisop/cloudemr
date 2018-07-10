<template>
  <div>
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <stats-card
          type="danger"
          title="1058"
          subTitle="Messages"
          icon="now-ui-icons ui-2_chat-round">
          <span slot="footer">
            <i class="now-ui-icons arrows-1_refresh-69"></i>
            Update now
          </span>
        </stats-card>
      </div>
  </div>
</div>    
</template>
<script>
  import {StatsCard} from 'src/components'

  export default {
    components: {
      StatsCard
    }
  }
</script>
<style>

</style>