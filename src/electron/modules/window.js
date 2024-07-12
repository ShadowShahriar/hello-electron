import lang from '../lang.js'
import { paths, winconfig, logstate } from '../defaults.js'
import { announce, rootdir, runfn } from '../utils.js'
import { BrowserWindow, Menu } from 'electron'

const fname = 'createWindow'
const { service, appname } = lang

export function createWindow(callback) {
	const ui = rootdir(paths.renderer)
	const preload = rootdir(paths.preload)
	const icon = rootdir(paths.appicon)
	announce(service, ui)
	announce(service, preload)
	announce(service, icon)

	const Window = new BrowserWindow(winconfig(icon, appname, preload))
	Menu.setApplicationMenu(null)
	announce(service, logstate.ok, 'Disabled application menu')

	Window.loadFile(ui)
	Window.setMaximizable(false)
	Window.on('hide', () => runfn(callback, fname, { active: false }))
	Window.on('show', () => runfn(callback, fname, { active: true }))
	Window.on('focus', () => announce(service, logstate.blue, 'Window focus'))
	Window.on('blur', () => announce(service, logstate.orange, 'Window blur'))
	Window.once('closed', () => announce(service, logstate.ok, 'Window closed'))
	Window.once('ready-to-show', () => {
		setTimeout(() => {
			Window.show()
			announce(service, logstate.ok, 'Window active')
		}, 200)
	})

	return Window
}

export function toggleWindow(appWindow, appActive, blur) {
	if (blur) appWindow.blur()
	if (appActive()) appWindow.hide()
	else appWindow.show()
}

export function focusWindow(appWindow) {
	if (!appWindow.isFocused()) {
		appWindow.focus()
	}
}

export function toggleOnTop(appWindow, state) {
	appWindow.setAlwaysOnTop(state)
	announce(service, state ? logstate.blue : logstate.orange, state ? 'Enable' : 'Disable', 'always on top')
}
