<template>
  <time-line type="simple">
    <time-line-item v-for="(item, ind) in timeLineItems" :key="ind" inverted
      :badge-icon="item.badgeIcon"
      :badge-type="item.badgeType">
      <span slot="header" :class="item.header.class">{{item.header.title}}</span>
      <template slot="content">
        <p>{{item.mensaje}}</p>
      </template>
      <span slot="footer">
        {{item.via}}
      </span>
    </time-line-item>
  </time-line>
</template>
<script>
export default {
  props: ['timeLineItems']
}
</script>