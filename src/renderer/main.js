import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import json2tree from 'json2tree'
import TreeView from 'vue-json-tree-view'
import VueI18n from 'vue-i18n'
import './polyfills'
import uiProPlugin from './plugins/ui-pro'
Vue.use(VueI18n)
Vue.use(uiProPlugin)
Vue.use(TreeView)
Vue.use(Vuetify)
Vue.use(json2tree)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$currentUser = {
  info: {
    displayImage: 'https://randomuser.me/api/portraits/men/86.jpg',
    displayName: 'Juan Perez',
    email: 'juanperez@cloudemr.cloud'
  }
}
// window.cloud.$Local
// TODO: setting default translations
// gonna be loaded from database, but its required to have an object to setup i18n
const i18n = new VueI18n({
  locale: 'es',
  messages: {
    es: require('./translations/es.json')
  }
})
/* eslint-disable no-new */
new Vue({
  i18n,
  components: {App},
  template: '<App/>'
}).$mount('#app')

// import {cloudPlugin} from './plugins/cloud'
// import router from './router'
// import store from './store'
// import {DBPlugin} from './plugins/database'
// import {InstanciaPlugin, Instancia} from './plugins/Instancia'
// const DSplugin = require('./plugins/deepstream').default
// you can set default global options and events when use
// Vue.use(InstanciaPlugin)
// Vue.use(cloudPlugin)
// Vue.use(DSplugin)
// Vue.use(DBPlugin)
