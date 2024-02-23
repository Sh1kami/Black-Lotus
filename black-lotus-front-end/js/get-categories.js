// Assuming you have 'token' defined globally or imported properly

fetch(`http://localhost:4200/api/categories/`, {
	method: 'GET',
	headers: {
		Authorization: 'Bearer ' + token
	}
})
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		return response.json()
	})
	.then(data => {
		console.log('Categories Data:', data)

		if (!data || !Array.isArray(data)) {
			console.error('Error: Invalid or missing categories data')
			return
		}

		const headercategoriesDiv = document.getElementById('header__categories')
		const footercategoriesDiv = document.getElementById('footer__categories')

		const createCategoriesDiv = data
			.map(category => {
				return `
                    <div class="category">
    					<a href="#" onclick="getProductsByCategory('${category.slug}')">${category.name}</a>
					</div>
`
			})
			.join('')

		headercategoriesDiv.innerHTML = createCategoriesDiv
		footercategoriesDiv.innerHTML = createCategoriesDiv
	})
	.catch(error => console.error('Error:', error))
