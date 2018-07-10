var ipcRenderer = require('electron').ipcRenderer

document.addEventListener('DOMContentLoaded', function () {
  ipcRenderer.sendToHost('html-content', document.body.innerHTML)
})
ipcRenderer.on('injectHTML', (content) => {
  document.body.innerHTML = content
  ipcRenderer.sendToHost('injectHTML', true)
})
