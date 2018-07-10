let settingsDebug = {
  debugLevel: {
    cloudProtocol: 'verbose'
  }
}
process.debug = 'cloud:*;*'
const originalConsoleLog = console.log.bind(console)
console.log = (...args) => {
  originalConsoleLog(...args)
}
const originalConsoleInfo = console.info.bind(console)
console.info = (...args) => {
  originalConsoleLog(...args)
}
const originalConsoleError = console.error.bind(console)
console.error = (...args) => {
  originalConsoleLog(...args)
}
const originalConsoleDir = console.dir.bind(console)
console.dir = (...args) => {
  originalConsoleDir(...args)
}
