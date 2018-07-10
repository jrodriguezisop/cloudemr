<template>
  <li :class="{'timeline-inverted': inverted}">
    <slot name="badge">
      <div class="timeline-badge" :class="badge.class">
        <v-icon :class="badge.icon.class">{{badge.icon.name}}</v-icon>
      </div>
    </slot>
    <div class="timeline-panel">
      <div class="timeline-heading">
        <slot name="header"></slot>
      </div>
      <div class="timeline-body" v-if="$slots.content">
        <slot name="content"></slot>
      </div>
      <h6 v-if="$slots.footer">
        <slot name="footer"></slot>
      </h6>
    </div>
  </li>
</template>
<script>
  export default {
    name: 'time-line-item',
    props: {
      inverted: Boolean,
      badge: { icon: { name: '', class: '' }, class: '' }
    }
  }
</script>
<style>
</style>
