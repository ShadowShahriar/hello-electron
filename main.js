import { app, ipcMain } from 'electron'
import { createWindow } from './src/electron/modules/window.js'
import { createTrayIcon, destroyTrayIcon } from './src/electron/modules/tray.js'
import { isMac, announceQuit, nothing, rootdir } from './src/electron/utils.js'

import squirrel from 'electron-squirrel-startup'
if (squirrel) app.quit()

let appTray
let appWindow
let appActive

function initWindow() {
	appWindow = createWindow(data => {
		appActive = data.active
		if (appTray && !appActive) appTray.focus()
	})
}

function initTray() {
	appTray = createTrayIcon(app, appWindow, () => appActive)
}

function init() {
	initWindow()
	initTray()
}

function exit() {
	destroyTrayIcon(appTray)
}

app.whenReady().then(() => init())
app.once('will-quit', announceQuit)
app.on('window-all-closed', () => (!isMac ? app.quit() : nothing()))
app.on('before-quit', () => exit())
app.on('activate', () => (BrowserWindow.getAllWindows().length === 0 ? initWindow() : nothing()))

ipcMain.on('window-controls', (_, response) => {
	if (response === 'minimize') {
		if (!appWindow.isMinimized()) {
			appWindow.minimize()
		}
	} else if (response === 'toggle') {
		if (appActive) {
			appWindow.hide()
		}
	} else if (response === 'close') {
		app.quit()
	}
})

ipcMain.handle('npath', async (_, query) => {
	let root = app.isPackaged ? '../app.asar.unpacked' : '.'
	if (query === 'node_modules') return rootdir(root, 'node_modules')
	else if (query === 'fonts') return rootdir(root, 'node_modules/@fontsource')
	return rootdir('.')
})
