export default {
  get: (pid, cb) => {
    if (!pid) {
      this.r.table('paciente').get(pid).run(this.cloud.rConn, (err, cursor) => {
        if (err) {
          console.log(err)
        } else {
          cursor.toArray().then(function (res) {
            cb(res[0])
          }).error(console.log)
        }
      })
    }
  },
  insert: (d) => {
    return new Promise((resolve, reject) => {
      this.cloud.r.table('paciente').insert(d).run(this.cloud.rConn, resp => {
        if (resp.generated_keys.length > 0) {
          resolve(resp.generated_keys[0])
        } else {
          reject(resp)
        }
      })
    })
  }
}
