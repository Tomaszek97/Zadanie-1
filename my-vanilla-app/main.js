import './style.css'

let typesData = []
let categoriesData = []
// Przechowywanie danych typów i kategorii pobrane z API.

document.addEventListener('DOMContentLoaded', function () {
	// Jest to event listener, który nasłuchuje na zdarzenie, gdy cała strona jest już wczytana i gotowa do działania.
	const typesList = document.querySelector('.typesList-root')
	const categoriesList = document.querySelector('.categoriesList-root')
	const Checkbox = document.getElementById('Checkbox')
	// Te dwie linie kodu pobierają referencje do elementów HTML o klasach typesList-root i categoriesList-root.

	function createTypeElement(type) {
		// Funkcja jest odpowiedzialna za tworzenie elementu typu na stronie.
		const buttonItem = document.createElement('button')
		// Tworzy nowy element HTML typu <button>.
		buttonItem.classList.add('btn-type-item')
		//  Dodaje klasę CSS 'btn-type-item' do utworzonego przycisku.
		buttonItem.setAttribute('id', type.id)
		// Ustawienie atrybutu id przycisku na wartość id przekazaną jako argument funkcji type.id. Atrybut id może być używany do jednoznacznej identyfikacji tego przycisku w przyszłości.
		buttonItem.textContent = type.name
		// Ustawienie tekstu przycisku na wartość name przekazaną jako argument funkcji type.name. Tekst ten będzie widoczny na przycisku.
		typesList.appendChild(buttonItem)
		// Dodaje przycisk do listy typów (typesList), która jest elementem na stronie, gdzie te przyciski typów są wyświetlane.
	}

	function createCategoryElement(category) {
		// Funkcja jest odpowiedzialna za tworzenie elementu listy (elementu <li>)
		const categoryItem = document.createElement('li')
		// Tworzy nowy element HTML typu <li>.
		categoryItem.textContent = category.name
		// Ustawienie tekstu elementu listy na wartość name przekazaną jako argument funkcji category.name. Tekst ten będzie widoczny w liście jako nazwa kategorii.

		if (category.iconUrl) {
			// To jest warunek, który sprawdza, czy kategoria ma zdefiniowany atrybut iconUrl.
			const icon = document.createElement('img')
			icon.alt = category.name + ' icon'
			// Ustawienie atrybutu alt ikony na nazwę kategorii z dopisanym tekstem " icon".
			icon.src = category.iconUrl
			// Ustawienie atrybutu src obrazka na adres URL ikony kategorii. To sprawia, że obrazek zostanie wyświetlony na stronie.
			categoryItem.appendChild(icon)
			//  Dodaje element <img> (ikona) jako dziecko elementu <li> (kategori) w celu wyświetlenia ikony obok nazwy kategorii.
		}

		categoriesList.appendChild(categoryItem)
		//  Dodaje element <li> (kategorię) do listy kategorii (categoriesList), która jest elementem na stronie, gdzie te kategorie są wyświetlane jako lista.
	}

	function addOnClickHandlers() {
		// Jest to funkcja, która dodaje obsługę kliknięcia na przyciski typów. Dla każdego przycisku typu dodaje ona event listener, który reaguje na kliknięcie i wykonuje działanie.
		const buttons = document.querySelectorAll('.btn-type-item')
		//  Pobiera wszystkie przyciski typów na stronie. Wykorzystuje metody document.querySelectorAll() do znalezienia wszystkich elementów o klasie 'btn-type-item'.
		buttons.forEach(button => {
			// Iteruje przez wszystkie znalezione przyciski typów.
			button.addEventListener('click', function () {
				//  Dodaje event listener do każdego przycisku typu. Event listener ten reaguje na kliknięcie na przycisk.
				const typeId = button.getAttribute('id')
				// Pobiera wartość atrybutu id przycisku, który jest identyfikatorem typu produktu. To pozwala na określenie, który typ produktu został wybrany.
				const filteredCategories = categoriesData.filter(category => category.type === typeId)
				// Filtruje kategorie na podstawie wybranego typu. Tworzy nową tablicę filteredCategories, która zawiera tylko te kategorie, których typ jest zgodny z wybranym typem produktu.
				categoriesList.innerHTML = ''
				//  Czyści listę kategorii.
				filteredCategories.forEach(createCategoryElement)
				// Wywołuje funkcję createCategoryElement dla każdej kategorii w tablicy filteredCategories. Oznacza to, że zostaną utworzone i dodane do listy tylko te kategorie, które są związane z wybranym typem produktu.
			})
		})
	}
	fetch('https://api-eko-bazarek.azurewebsites.net/api/products/types')
		.then(response => response.json())
		.then(types => {
			typesData = types
			// To jest część kodu, która wysyła zapytanie do API, pobiera dane typów produktów, przekształca odpowiedź na format JSON, a następnie przypisuje te dane do zmiennej typesData.
			types.sort((a, b) => a.name.localeCompare(b.name))
			// Sortowanie danych typów produktów alfabetycznie po nazwach typów.
			types.forEach(createTypeElement)
			// Iteruje przez tablicę typów produktów (types) i dla każdego typu wywołuje funkcję createTypeElement, która jest odpowiedzialna za tworzenie przycisku typu i dodawanie go na stronie.
			addOnClickHandlers()
			// Wywołuje funkcję addOnClickHandlers, która dodaje obsługę kliknięcia do przycisków typów, co pozwala na filtrowanie kategorii produktów na stronie po wybranym typie.

			if (types.length > 0) {
				// Warunek, który sprawdza czy istnieją jakieś typy produktów w pobranych danych.
				const firstType = types[0]
				// Pobiera pierwszy typ produktu z tablicy types i przypisuje go do zmiennej firstType.
				const typeId = firstType.id
				// Pobiera identyfikator (ID) pierwszego typu produktu i przypisuje go do zmiennej typeId.
				const filteredCategories = categoriesData.filter(category => category.type === typeId)
				//  Filtruje kategorie na podstawie identyfikatora typu produktu (typeId). Tworzy nową tablicę filteredCategories, która zawiera tylko te kategorie, których typ jest zgodny z identyfikatorem pierwszego typu produktu.
				filteredCategories.forEach(createCategoryElement)
				// Wywołuje funkcję createCategoryElement dla każdej kategorii znajdującej się w tablicy filteredCategories. To powoduje dodanie tych kategorii do listy kategorii na stronie.
			}
		})

	fetch('https://api-eko-bazarek.azurewebsites.net/api/products/categories')
		.then(response => response.json())
		.then(categories => {
			categoriesData = categories
			// Ta część kodu pobiera dane kategorii z API, przekształca je na format JSON i przypisuje do zmiennej categoriesData.
			categories.sort((a, b) => a.name.localeCompare(b.name))
			categories.forEach(createCategoryElement)

			Checkbox.addEventListener('click', function () {
				// Obsługa checkboxa do filtrowania kategorii wege
				if (Checkbox.checked) {
					const filteredCategories = categoriesData.filter(
						category => category.type !== 'MEAT' && category.type !== 'COOKED_MEATS' && category.type !== 'FISHES'
					)
					categoriesList.innerHTML = ''
					filteredCategories.forEach(createCategoryElement)
				}
			})
		})
})
