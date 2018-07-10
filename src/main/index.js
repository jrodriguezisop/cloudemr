'use strict'
import { app, globalShortcut, protocol, BrowserWindow, Tray, nativeImage, Notification, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import './logger'
import datastore from './datastore'
const vbuffer = require('safe-Buffer').Buffer
const fs = require('fs')
const path = require('path')
protocol.registerStandardSchemes(['cloud'])
app.setAsDefaultProtocolClient('cloud')
const cloud = datastore.models
const local = datastore.ls
const qs = datastore.qs
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// let Ventanas = {}
// let Started = false
let userAgent = `${app.getName()} v${app.getVersion()}; ${process.env.NODE_ENV}`
const trayIcon = new nativeImage.createFromDataURL(`data:text/html;base64,PGh0bWw+CiAgICA8aGVhZD4KICAgICAgICA8c3R5bGU+CiAgICAgICAgICAgIGh0bWwsIGJvZHkgewogICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDB2aDsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgYm9keSB7CiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICAgICAgICB9CgogICAgICAgICAgICAuYm94IHsKICAgICAgICAgICAgICAgIHdpZHRoOiAxMDB2dzsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwdmg7CiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOwogICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOwogICAgICAgICAgICB9CgogICAgICAgICAgICAud2F2ZSB7CiAgICAgICAgICAgICAgICBvcGFjaXR5OiAuNDsKICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICAgICAgICAgIHRvcDogMTEwdmg7CiAgICAgICAgICAgICAgICBsZWZ0OiAtNTB2aDsKICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICMwYWY7CiAgICAgICAgICAgICAgICB3aWR0aDogMTUwdnc7CiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE1MHZoOwogICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IC0wdnc7CiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAtMTB2aDsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogNTAlIDQ4JTsKICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogNTAlIDQ4JTsKICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDQzJTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBkcmlmdCAzMDAwMG1zIGluZmluaXRlIGxpbmVhcjsKICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBkcmlmdCAzMDAwMG1zIGluZmluaXRlIGxpbmVhcjsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgLndhdmUuLXRocmVlIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBkcmlmdCA1MDAwMG1zIGluZmluaXRlIGxpbmVhcjsKICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IGRyaWZ0IDUwMDAwbXMgaW5maW5pdGUgbGluZWFyOwogICAgICAgICAgICB9CgogICAgICAgICAgICAud2F2ZS4tdHdvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBkcmlmdCA3MDAwMG1zIGluZmluaXRlIGxpbmVhcjsKICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IGRyaWZ0IDcwMDAwbXMgaW5maW5pdGUgbGluZWFyOwogICAgICAgICAgICAgICAgb3BhY2l0eTogLjE7CiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB5ZWxsb3c7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIC5ib3g6YWZ0ZXIgewogICAgICAgICAgICAgICAgY29udGVudDogJyc7CiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICAgICAgICAgIGxlZnQ6IDA7CiAgICAgICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgICAgICB3aWR0aDogMjAwdnc7CiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMHZoOwogICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsKICAgICAgICAgICAgICAgIHotaW5kZXg6IDExOwogICAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApOwogICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBkcmlmdCB7CiAgICAgICAgICAgIGZyb20gewogICAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsKICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7CiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgfQoKICAgICAgICAgICAgQGtleWZyYW1lcyBkcmlmdCB7CiAgICAgICAgICAgIGZyb20gewogICAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsKICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7CiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgfQoKICAgICAgICA8L3N0eWxlPgogICAgPC9oZWFkPgogICAgPGJvZHk+CiAgICAgICAgPGRpdiBjbGFzcz0iYm94Ij4KICAgICAgICAgICAgPGRpdiBjbGFzcz0id2F2ZSAtb25lIj48L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0id2F2ZSAtdHdvIj48L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0id2F2ZSAtdGhyZWUiPjwvZGl2PgoKICAgICAgICAgIDwvZGl2PgogICAgPC9ib2R5Pgo8L2h0bWw+`)
const Notificate = async (title, subtitle, body = false) => {
  new Notification({
    title: title || 'PN-Remote',
    subtitle: subtitle || 'new Notification.',
    icon: trayIcon,
    body: (body) || ''
  }).show()
}
// let Instance
let cloudDesktop
let mainWindow

if (process.platform !== 'darwin') {
  const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
  if (isSecondInstance) {
    app.quit()
  }
}
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
let tray

const createCloudDesktop = () => {
  cloudDesktop = new BrowserWindow({
    alwaysOnTop: true,
    transparent: true,
    userAgent: userAgent,
    fullscreenable: false,
    opacity: 1,
    height: 300,
    width: 250,
    frame: false,
    hasShadow: false,
    show: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      partition: 'electron',
      preload: 'preload.js'
    }
  })
  // cloudDesktop.loadURL(`data:text/html;base64,PGh0bWw+CiAgICA8aGVhZD4KICAgICAgICA8c3R5bGU+CiAgICAgICAgICAgIGh0bWwsIGJvZHkgewogICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJvZHkgewogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgLmJveCB7CiAgICAgICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgICAgICBoZWlnaHQ6IDEwMCU7CgogICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIC53YXZlIHsKICAgICAgICAgICAgb3BhY2l0eTogLjQ7CiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICAgICAgdG9wOiAxMjB2aDsKICAgICAgICAgICAgbGVmdDogLTEwJTsKICAgICAgICAgICAgYmFja2dyb3VuZDogIzBhZjsKICAgICAgICAgICAgd2lkdGg6IDIwMHZ3OwogICAgICAgICAgICBoZWlnaHQ6IDIwMHZoOwogICAgICAgICAgICBtYXJnaW4tbGVmdDogLTgwdnc7CiAgICAgICAgICAgIG1hcmdpbi10b3A6IC0yNTBweDsKICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogNTAlIDQ4JTsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNDMlOwogICAgICAgICAgICBhbmltYXRpb246IGRyaWZ0IDMwMDAwbXMgaW5maW5pdGUgbGluZWFyOwogICAgICAgICAgICB9CgogICAgICAgICAgICAud2F2ZS4tdGhyZWUgewogICAgICAgICAgICBhbmltYXRpb246IGRyaWZ0IDUwMDAwbXMgaW5maW5pdGUgbGluZWFyOwogICAgICAgICAgICB9CgogICAgICAgICAgICAud2F2ZS4tdHdvIHsKICAgICAgICAgICAgYW5pbWF0aW9uOiBkcmlmdCA3MDAwMG1zIGluZmluaXRlIGxpbmVhcjsKICAgICAgICAgICAgb3BhY2l0eTogLjE7CiAgICAgICAgICAgIGJhY2tncm91bmQ6IHllbGxvdzsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgLmJveDphZnRlciB7CiAgICAgICAgICAgIGNvbnRlbnQ6ICIiOwogICAgICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICAgICAgbGVmdDogMDsKICAgICAgICAgICAgdG9wOiAwOwogICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50OwogICAgICAgICAgICB6LWluZGV4OiAxMTsKICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTsKICAgICAgICAgICAgfQoKCiAgICAgICAgICAgIEBrZXlmcmFtZXMgZHJpZnQgewogICAgICAgICAgICBmcm9tIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0KICAgICAgICAgICAgZnJvbSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0KICAgICAgICAgICAgfQogICAgICAgIDwvc3R5bGU+CiAgICA8L2hlYWQ+CiAgICA8Ym9keT4KICAgICAgICA8ZGl2IGNsYXNzPSJib3giPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJ3YXZlIC1vbmUiPjwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJ3YXZlIC10d28iPjwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJ3YXZlIC10aHJlZSI+PC9kaXY+CiAgICAgICAgICAgIDxkaXYgCiAgICAgICAgICA8L2Rpdj4KICAgIDwvYm9keT4KPC9odG1sPg==`)
  console.log('requesting cloud://cloudemr')
  //  cloudDesktop.loadURL(`cloud://cloudemr`)
  cloudDesktop.loadURL(`file://${__static}/splash.html`)
  cloudDesktop.show()
  cloudDesktop.maximize()
  cloudDesktop.setIgnoreMouseEvents(true)
  cloudDesktop.setMenu(null)
  // check if the system its setup as kiosk
  // or to keep user from using host SO
}
const winModules = {}
const createWinForModule = (modulo, opts = {}) => {
  if (!winModules[modulo]) {
    let mWindow = new BrowserWindow({
      parent: cloudDesktop,
      alwaysOnTop: false,
      transparent: true,
      userAgent: userAgent,
      fullscreenable: false,
      opacity: 1,
      height: 800,
      width: 1200,
      frame: false,
      hasShadow: true,
      show: false,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        partition: 'electron',
        preload: path.join(__dirname, `modulos/${modulo}.js`)
      }
    })
    mWindow.loadURL(`cloud://cloudemr/cirubari/patient/`)
    // mWindow.loadURL(winURL, {
    //   postData: {
    //     data: vbuffer.from('pid=12312312')
    //   }
    // })
    mWindow.setMenu(null)
    mWindow.on('closed', () => {
      mWindow = null
    })
    mWindow.on('blue', () => {
      toggleWindow(mWindow)
    })
    mWindow.once('ready-to-show', () => {
      //  mainWindow.maximize()
      // toggleWindow(mWindow)
    })
  }
}

const closeWinModule = (modulo) => {
  if (winModules[modulo]) {
    winModules[modulo].removeAllListeners('closed')
    setImmediate(() => {
      winModules[modulo].close()
    })
    winModules[modulo] = null
  }
}

const toggleWindow = (win) => {
  if (win.isVisible()) {
    win.hide()
  } else {
    showWindow(win)
  }
}
const showWindow = (win) => {
  // const position = getWindowPosition(win)
  //  mainWindow.setPosition(position.x, position.y, false)
  win.center()
  win.show()
  win.focus()
}

const getWindowPosition = (win) => {
  const windowBounds = win.getBounds()
  const trayBounds = tray.getBounds()
  var x = 0
  var y = 0
  console.log(trayBounds)
  if (process.platform !== 'darwin') {
    x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    y = Math.round(trayBounds.y - windowBounds.height + 4)
  } else {
    x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    y = Math.round(trayBounds.y + trayBounds.height + 4)
  }
  return {x: x, y: y}
}

app.on('ready', () => {
  const ret = globalShortcut.register('CommandOrControl+P', () => {
    console.log('CommandOrControl+P is pressed')
  })
  if (!ret) {
    console.log('registration failed')
  }
  let cloudProtocolConn
  protocol.registerHttpProtocol('cloud', (req, cb) => {
    console.dir(req)
    let url = req.url
    console.log('url: %s', url)
    cb(url)
  }, function (err) {
    if (!err) {
      console.log('Registered protocol succesfully')
      createCloudDesktop()
      // createWinForModule('cloudemr-patientchart')
    }
  })
  protocol.interceptHttpProtocol('cloud', function (request, callback) {
    console.dir(request)
    let url = request.url.substr(7)
    console.log('url: %s', url)
    callback(url)
  })
  // protocol.registerStreamProtocol('cloud', (request, callback) => {
  //   const url = request.url.substr(8)
  //   console.log(url)
  //   let cloudPath = url.split('/')
  //   const database = cloudPath[0].split('.')[0]
  //   const table = cloudPath[0].split('.')[1]
  //   cloudPath = cloudPath.shift().join('.')
  //   const r = require('rethinkdb')
  //   const createResponse = (statusCode, headers = {
  //     'content-type': 'text/html'
  //   }, content) => {
  //     return {
  //       statusCode: statusCode,
  //       headers: headers,
  //       data: content
  //     }
  //   }
  //   const getcloudProtConn = async () => {
  //     await r.connect({port: 28025, login: 'electron-public', password: 'public', db: database})
  //   }
  //   r.table(table).get(cloudPath)
  //     .run(getcloudProtConn(), (err, cursor) => {
  //       if (err) {
  //         console.error(err)
  //         callback(createResponse(500, null, createStream(err.toString())))
  //         // TODO: send event to Notification stream
  //       }
  //       callback(cursor)
  //     })
  // }, (error) => {
  //   if (error) console.error('Failed to register protocol')
  // })
  // tray = new Tray(trayIcon)
  // tray.setToolTip('PatientNOW remote Interface')
  // tray.on('right-click', toggleWindow)
  // tray.on('double-click', toggleWindow)
  // tray.on('click', function (event) {
  //   toggleWindow()
  //   if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
  //     mainWindow.openDevTools({mode: 'detach'})
  //   }
  // })

  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      autoUpdater.checkForUpdatesAndNotify()
    }, 60000)
  }
})
app.on('before-quit', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createCloudDesktop()
  }
})
const qsEncode = function (obj) {
  return vbuffer.from(qs.stringify(obj)).toString('base64')
}
const qsDecode = function (encObj) {
  return qs.parse(vbuffer.from(encObj, 'base64').toString())
}

ipcMain.on('DOMContentLoaded', payload => {
  console.log('DOMContentLoaded')
})
ipcMain.on('ALERT', payload => {
  Notificate('Error', payload.msg)
})
autoUpdater.on('update-available', updateInfo => {
  Notificate('Update Available', updateInfo.toString())
  mainWindow.webContents.send('UPDATING', {})
})
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  autoUpdater.quitAndInstall()
})
autoUpdater.on('error', messagenode => {
  console.error('An error ocurred while trying to update this App')
  console.error(messagenode)
})
