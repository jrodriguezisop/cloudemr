/**
 * The file enables `@/components/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
const files = require.context('.', true, /.vue$/)
const Views = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  Views[key.replace(/(\.\/|.vue)/g, '')] = files(key)
})
export default Views
