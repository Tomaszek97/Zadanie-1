import './style.css'
const apiUrl = 'https://api-eko-bazarek.azurewebsites.net/api/products/types'
var buttonGet = document.getElementById('Types-item')

buttonGet.addEventListener('click', () => {
	getTypes().then(types => console.log(types))
})

async function getTypes() {
	const respons = await fetch(apiUrl)
	return respons.json()
}

