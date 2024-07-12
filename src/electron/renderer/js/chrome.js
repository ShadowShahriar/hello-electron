const titlebar_buttons = document.querySelectorAll('.ttl-btn')
for (let button of titlebar_buttons) {
	const action = button.getAttribute('data-action')
	button.addEventListener('click', () => ipcRenderer.send('window-controls', action))
}

const root = document.querySelector('html')
window.addEventListener('blur', _ => root.setAttribute('data-focus', 'false'))
window.addEventListener('focus', _ => root.setAttribute('data-focus', 'true'))
