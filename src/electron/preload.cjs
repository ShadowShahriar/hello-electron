const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
	send: (channel, data) => ipcRenderer.send(channel, data)
})

contextBridge.exposeInMainWorld('npath', {
	get: async path => {
		const result = await ipcRenderer.invoke('npath', path)
		return result
	}
})
