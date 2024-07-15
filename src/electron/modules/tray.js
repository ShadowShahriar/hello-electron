import lang from '../lang.js'
import { Tray, Menu } from 'electron'
import { paths, logstate } from '../defaults.js'
import { rootdir, announce, getcfg } from '../utils.js'
import { toggleWindow, focusWindow, toggleOnTop } from './window.js'
import { showAbout } from './dialog.js'

const fname = 'createTrayIcon'
const { service, appname } = lang

export function createTrayIcon(app, win, appactive) {
	const icon = rootdir(paths.trayicon)
	const appTray = new Tray(icon)
	appTray.setToolTip(appname)

	const contextMenu = Menu.buildFromTemplate([
		{ label: '&Toggle window', click: _ => toggleWindow(win, appactive, true) },
		{ label: 'Show on &top', type: 'checkbox', click: i => toggleOnTop(win, i.checked) },
		{ label: '&About', click: async _ => await showAbout(app, win) },
		{ label: '&Quit', click: _ => app.quit() }
	])

	contextMenu.items[1].checked = !!getcfg('window_on_top')
	appTray.setContextMenu(contextMenu)
	appTray.on('click', () => focusWindow(win))
	appTray.on('double-click', () => toggleWindow(win, appactive, false))
	return appTray
}

export function destroyTrayIcon(appTray) {
	if (appTray) {
		appTray.destroy()
		if (appTray.isDestroyed()) announce(service, logstate.ok, 'Destroyed tray icon')
	}
}
