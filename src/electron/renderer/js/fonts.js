const fontname = 'Quicksand'
const variable = true

async function loadfonts() {
	const rootpath = await npath.get('fonts')
	const old = document.querySelector('#fontcss')
	document.head.removeChild(old)

	const link = document.createElement('link')
	link.id = 'themecss'
	link.rel = 'stylesheet'
	link.href = `${rootpath}${variable ? '-variable' : ''}/${fontname}/index.css`
	link.onload = _ => console.log('✅ font loaded')

	document.head.appendChild(link)
}

loadfonts()
