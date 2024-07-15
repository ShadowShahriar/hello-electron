import lang from '../lang.js'
import { rootdir } from '../utils.js'
import { paths } from '../defaults.js'
import { dialog, shell, clipboard } from 'electron'
import { version, platform, arch } from 'node:os'
const { appname } = lang
const link = 'https://github.com/ShadowShahriar/hello-electron'

export async function showAbout(app, appWindow) {
	const icon = rootdir(paths.appicon)
	const ver = process.versions
	const info =
		`Version: ${app.getVersion()} (${app.isPackaged ? 'Packed' : 'Dev'})\n` +
		`Electron: v${ver.electron}\n` +
		`Chromium: v${ver.chrome}\n` +
		`Node.js: v${ver.node}\n` +
		`V8 Engine: v${ver.v8}\n` +
		`OS: ${version()} (${platform()}/${arch()})`

	const modal = await dialog.showMessageBox(appWindow, {
		icon,
		title: lang.title_about,
		type: 'info',
		message: appname,
		detail: info,
		buttons: ['View Project', 'Copy', 'Close'],
		defaultId: 1,
		cancelId: 2,
		noLink: true
	})

	const { response } = modal
	if (response === 0) await shell.openExternal(link)
	else if (response === 1) clipboard.writeText(info)
}
