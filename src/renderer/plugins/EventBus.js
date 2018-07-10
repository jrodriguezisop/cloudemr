import Vue from 'vue'
const EventBus = new Vue()
const EventBusPlugin = {
  install (Vue) {
    if (!Vue.prototype.$Bus) {
      Object.defineProperties(Vue.prototype, {
        $Bus: {
          get: function () {
            return EventBus
          }
        }
      })
    }
  }
}

export { EventBus as default, EventBusPlugin }
