
import '@/polyfills'
// import '@/assets/botadetrapo/scss/bootstrap.scss'
// import '@/assets/sass/now-ui-dashboard.scss'
import '@/assets/css/style.css'
import {directive as vClickOutside} from 'vue-clickaway'
import VeeValidate from 'vee-validate'
import fgInput from '@/components/ui-pro/Inputs/formGroupInput.vue'
import DropDown from '@/components/ui-pro/Dropdown.vue'
import Card from '@/components/ui-pro/Cards/Card.vue'
import Button from '@/components/ui-pro/Button.vue'
import {Input, InputNumber, Tooltip, Popover} from 'element-ui'

import 'es6-promise/auto'

export default {
  install (Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('drop-down', DropDown)
    Vue.component('card', Card)
    Vue.component('n-button', Button)
    Vue.component(Input.name, Input)
    Vue.component(InputNumber.name, InputNumber)
    Vue.use(Tooltip)
    Vue.use(Popover)
    Vue.directive('click-outside', vClickOutside)
    Vue.use(VeeValidate, { fieldsBagName: 'veeFields' })
  }
}
