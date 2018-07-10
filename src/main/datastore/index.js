
import patient from './patient'
import qs from 'qs'
import r from 'rethinkdb'
import * as ls from 'node-localstorage'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS({encodingType: 'rc4', isCompression: false, encryptionSecret: 's3cr3tPa$$w0rd@123'})
const vbuffer = require('safe-Buffer').Buffer
export default {
  qs: qs,
  ls: ls,
  r: r,
  patients: patient,
  getConn: async () => {
    await r.connect({
      rOpts: {
        port: 28025,
        db: 'cloudemr',
        login: 'pymes-apitmp',
        password: '35e14cd2a2e46bb9f5e042e99f27505b48caca73a613d50d7355469036303b34'
      }
    })
  },
  newID: () => {
    return vbuffer.from(new Date().toISOString()).toString('base64')
  },
  closeAll: () => {
    r.close()
  }
}
