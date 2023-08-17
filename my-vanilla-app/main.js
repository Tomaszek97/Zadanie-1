import './style.css'
document.addEventListener('DOMContentLoaded', function () {
	// Znajdź listy elementów na stronie
	const typesList = document.querySelector('.TypesList-root')
	const categoriesList = document.querySelector('.CategoriesList-root')
	const productsContainer = document.querySelector('.Products-root')

	// Pobierz rodzaje produktów i wyświetl je na stronie
	fetch('https://api-eko-bazarek.azurewebsites.net/api/products/types')
		.then(function (response) {
			return response.json()
		})
		.then(function (types) {
			types.sort(function (a, b) {
				return a.name.localeCompare(b.name)
			})

			types.forEach(function (type) {
				const typeItem = document.createElement('li')
				const buttonItem = document.createElement('button')
				buttonItem.classList.add('btn-type-item')
				buttonItem.setAttribute('id', 'button-type' + type.id)
				typeItem.classList.add('Types-item')
				typeItem.textContent = type.name
				typeItem.appendChild(buttonItem)
				typesList.appendChild(typeItem)
			})
		})

	// Pobierz kategorie produktów i wyświetl je na stronie
	fetch('https://api-eko-bazarek.azurewebsites.net/api/products/categories')
		.then(function (response) {
			return response.json()
		})
		.then(function (categories) {
			categories.sort(function (a, b) {
				return a.name.localeCompare(b.name)
			})

			categories.forEach(function (category) {
				const categoryItem = document.createElement('li')
				categoryItem.textContent = category.name

				if (category.iconUrl) {
					const icon = document.createElement('img')
					icon.alt = category.name + ' icon'
					icon.src = category.iconUrl
					categoryItem.appendChild(icon)
				}

				categoriesList.appendChild(categoryItem)
			})
		})
})

const buttons = document.getElementsByClassName('btn-type-item')
console.table(buttons)
