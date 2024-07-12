export const debugfnlen = 15
export const logstate = {
	ok: '✅',
	error: '⛔',
	blue: '🟦',
	orange: '🟧'
}

export const paths = {
	renderer: 'src/electron/renderer/index.html',
	activator: 'src/electron/renderer/activator.html',
	preload: 'src/electron/preload.cjs',
	appicon: 'src/assets/app.ico',
	trayicon: 'src/assets/tray.png',
	notification: 'src/assets/app.ico'
}

export const winconfig = (icon, title = 'Untitled', preload = null) => {
	return {
		icon,
		title,
		titleBarStyle: 'hidden',
		backgroundColor: '#090b10',
		autoHideMenuBar: true,
		x: 50,
		y: 100,
		width: 500,
		height: 900,
		frame: true,
		show: false,
		resizable: false,
		webPreferences: {
			devTools: false,
			contextIsolation: true,
			preload
		}
	}
}
