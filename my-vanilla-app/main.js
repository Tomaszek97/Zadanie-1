import './style.css'

let typesData = []
let categoriesData = []

document.addEventListener('DOMContentLoaded', function () {
	const typesList = document.querySelector('.typesList-root')
	const categoriesList = document.querySelector('.categoriesList-root')

	function createTypeElement(type) {
		const typeItem = document.createElement('li')
		const buttonItem = document.createElement('button')
		buttonItem.classList.add('btn-type-item')
		buttonItem.setAttribute('id', type.id)
		typeItem.classList.add('types-item')
		typeItem.textContent = type.name
		typeItem.appendChild(buttonItem)
		typesList.appendChild(typeItem)
	}

	function createCategoryElement(category) {
		const categoryItem = document.createElement('li')
		categoryItem.textContent = category.name

		if (category.iconUrl) {
			const icon = document.createElement('img')
			icon.alt = category.name + ' icon'
			icon.src = category.iconUrl
			categoryItem.appendChild(icon)
		}

		categoriesList.appendChild(categoryItem)
	}

	fetch('https://api-eko-bazarek.azurewebsites.net/api/products/types')
		.then(response => response.json())
		.then(types => {
			typesData = types

			types.sort((a, b) => a.name.localeCompare(b.name))

			types.forEach(createTypeElement)
		})

	fetch('https://api-eko-bazarek.azurewebsites.net/api/products/categories')
		.then(response => response.json())
		.then(categories => {
			categoriesData = categories

			categories.sort((a, b) => a.name.localeCompare(b.name))

			categories.forEach(createCategoryElement)
		})

	const buttons = document.getElementsByClassName('btn-type-item')
	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i]
		button.addEventListener('click', function () {
			const typeId = button.getAttribute('id')
			const filteredCategories = categoriesData.filter(category => category.typeId === typeId)

			categoriesList.innerHTML = ''
			filteredCategories.forEach(createCategoryElement)
		})
	}
})
