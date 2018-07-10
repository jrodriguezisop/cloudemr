import deepstream from 'deepstream.io-client-js'
import Buffer from 'safe-buffer'
import EventBus from './EventBus'
const machineId = require('machine-id')
const os = require('os')
const DS = deepstream(`wss://api.patientnow.cloud:443?station=${machineId(true)}`).login({ username: os.hostname(), password: machineId(true) })
const DSplugin = {
  install (Vue) {
    if (!Vue.prototype.$DS) {
      Object.defineProperties(Vue.prototype, {
        $DS: {
          get: function () {
            return DS
          }
        }
      })
    }
    if (!Vue.prototype.$CurrentUser) {
      Object.defineProperties(Vue.prototype, {
        $CurrentUser: {
          get: function () {
            return {}
          }
        }
      })
    }
  }
}
DS.on('connectionStateChanged', connectionState => {
  if (connectionState === 'OPEN') {
    EventBus.$emit('WSS_STATE', 'Connected')
    // TODO: code an RPC to request, user data record
    // where if not existant, will create permissions
    // and default app settings for it.
    let userRecord = DS.record.setData(`pnadmin/users/${machineId(true)}`, {
      username: os.hostname()
    }, err => {
      if (err) EventBus.$emit('error', err)
      EventBus.$emit('ALERT', {type: 'info', text: 'Welcome!'})
    })
    let userData = DS.record
      .getRecord(`pnadmin/users/${DS.getUid()}`)
    userData
      .subscribe('*', data => {
        this.$CurrentUser = data
      })
  } else if (connectionState === 'OPEN' || connectionState === 'ERROR') {
    EventBus.$emit('WSS_STATE', 'Error')
  } else {
    EventBus.$emit('WSS_STATE', 'Connecting')
  }
})
DS.presence.subscribe((username, login) => {
  EventBus.$emit('ALERT', {
    type: 'info',
    text: `${username.toUpper()} has ${login ? 'Connected!' : 'Disconnected.'}`
  })
})
export { DSplugin as default, DS }
