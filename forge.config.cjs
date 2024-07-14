const { resolve } = require('path')
const { readFileSync } = require('fs')

const usrname = 'ShadowShahriar'
const executableName = 'app'
const assetsFolder = 'build'
const loadingGif = resolve(__dirname, assetsFolder, 'loading.gif')
const icons = {
	general: resolve(__dirname, assetsFolder, 'icon'),
	debian: resolve(__dirname, assetsFolder, 'icon.png'),
	winsetup: resolve(__dirname, assetsFolder, 'installerIcon.ico')
}

const unpack = ['**/node_modules/@fontsource/**', '**/node_modules/@fontsource-variable/**']

const file = resolve('.', 'package.json')
const data = readFileSync(file, 'utf-8')
const pjson = JSON.parse(data)

module.exports = {
	packagerConfig: {
		icon: icons.general,
		executableName,
		asar: { unpack }
	},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				loadingGif,
				description: pjson.description,
				setupIcon: icons.winsetup,
				setupExe: `${pjson.name}-v${pjson.version}-${process.platform}-${process.arch}-setup.exe`,
				iconUrl: `https://github.com/${usrname}/${pjson.name}/raw/main/${assetsFolder}/icon.ico`,
				copyright: `Copyright (c) ${new Date().getFullYear()} ${pjson.author.name}`,
				authors: pjson.author.name,
				owners: pjson.author.name
			}
		},
		{ name: '@electron-forge/maker-zip', platforms: ['win32', 'darwin'] },
		{ name: '@electron-forge/maker-dmg', config: { format: 'ULFO' } },
		{ name: '@electron-forge/maker-deb', config: { maintainer: pjson.author.name, icon: icons.debian } },
		{
			name: '@electron-forge/maker-rpm',
			config: {
				maintainer: pjson.author.name,
				homepage: pjson.homepage,
				license: pjson.license,
				icon: icons.debian
			}
		}
	],
	plugins: [{ name: '@electron-forge/plugin-auto-unpack-natives', config: {} }],
	publishers: [
		{
			name: '@electron-forge/publisher-github',
			config: { repository: { owner: usrname, name: pjson.name }, draft: true }
		}
	]
}
