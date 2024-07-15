import lang from './lang.js'
import ElectronStore from 'electron-store'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { debugfnlen, logstate } from './defaults.js'

const { service } = lang
const store = new ElectronStore()
export const setcfg = (key, val) => store.set(key, val)
export const getcfg = key => store.get(key)
export const delcfg = key => store.delete(key)
export const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '../../')
export const isMac = process.platform === 'darwin'
export const isDev = process.env.NODE_ENV !== 'production'
export function nothing() {
	return
}

export function rootdir() {
	return resolve(__dirname, ...Array.from(arguments))
}

export function announce() {
	let data = Array.from(arguments)
	if (data.length === 0) {
		console.log('')
		return
	}

	const fname = `[${data.shift()}]`
	const pad = fname.padEnd(debugfnlen, ' ')
	console.log(`:: ${pad} ::`, ...data)
}

export function announceQuit() {
	announce(service, logstate.ok, lang.ant_quit)
}

export function runfn(fn, fname = 'default', params = {}) {
	if (typeof fn === 'function') return fn({ error: false, ...params, source: fname })
	return null
}
