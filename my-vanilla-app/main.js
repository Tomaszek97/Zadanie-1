import './style.css'
const apiUrl = 'https://api-eko-bazarek.azurewebsites.net/api/products/types'
var buttonGet = document.getElementById('btnGet')

// buttonGet.addEventListener('click', () => {
// 	getTypes().then(types => console.log(types))
// })

async function getTypes() {
	const respons = await fetch(apiUrl)
	return respons.json()
}

const jsonData = [
  {
    "id": "APPLE",
    "name": "Jabłka",
    "type": "FRUITS",
    "iconUrl": "https://api-eko-bazarek.azurewebsites.net/images/categories/icons8-apple-64.png"
  },
  {
    "id": "BEEF",
    "name": "Wołowina",
    "type": "MEAT",
    "iconUrl": "https://api-eko-bazarek.azurewebsites.net/images/categories/icons8-beef-64.png"
  }
];

const listContainer = document.getElementById('list-container'); 

const itemsHtml = jsonData.map(item => `
  <div class="list-item">
    <img src="${item.iconUrl}" alt="${item.name}">
    <div>${item.name}</div>
  </div>
`).join('');

listContainer.innerHTML = itemsHtml;