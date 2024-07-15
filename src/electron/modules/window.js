import lang from '../lang.js'
import { paths, winconfig, logstate } from '../defaults.js'
import { announce, rootdir, runfn, getcfg, setcfg } from '../utils.js'
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
	announce(service, logstate.ok, lang.ant_nomenu)

	Window.loadFile(ui)
	Window.setMaximizable(false)

	if (getcfg('window_on_top')) {
		Window.setAlwaysOnTop(true)
		announce(service, logstate.blue, lang.ant_ontop_start)
	}

	Window.on('hide', () => runfn(callback, fname, { active: false }))
	Window.on('show', () => runfn(callback, fname, { active: true }))
	Window.on('focus', () => announce(service, logstate.blue, lang.ant_wfocus))
	Window.on('blur', () => announce(service, logstate.orange, lang.ant_wblur))
	Window.once('closed', () => announce(service, logstate.ok, lang.ant_wclose))
	Window.once('ready-to-show', () => {
		setTimeout(() => {
			Window.show()
			announce(service, logstate.ok, lang.ant_wactive)
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
	setcfg('window_on_top', state)
	announce(
		service,
		state ? logstate.blue : logstate.orange,
		state ? lang.ant_enable : lang.ant_disable,
		lang.ant_ontop
	)
}
