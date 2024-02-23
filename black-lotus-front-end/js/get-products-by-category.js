// Assuming you have 'token' defined globally or imported properly

function getProductsByCategory(categorySlug) {
	const productDetailsDiv = document.getElementById('products-by-category')

	fetch(`http://localhost:4200/api/products/by-category/${categorySlug}`, {
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
			console.log(`Products Data for category '${categorySlug}':`, data)

			if (!data || !Array.isArray(data)) {
				console.error('Error: Invalid or missing products data')
				return
			}

			const createHTML = data
				.map(product => {
					const imagesHTML = product.images && product.images.length > 0 ? `<img src="${product.images[0]}" alt="Product Image">` : ''

					return `
                        <div class="main__products-by-category-inside">
                            <div class="main__products-list">
                                <a href="/${product.slug}" class="product-card">
                                    <div class="product-card__image">
                                        <picture>
                                            <source srcset="${product.images[0]}" type="image/webp" />
                                            <img src="${product.images[0]}" alt="Product image" class="product-card__image-inside" />
                                        </picture>
                                        <div class="product-card__blackout"></div>
                                        <div class="product-card__price">${product.price} UAH</div>
                                        <div class="product-card__status-${product.status}">NEW!</div>
                                        <button type="button" class="product-card__more">Детальніше -></button>
                                    </div>
                                    <button type="button" class="product-card__name">${product.name}</button>
                                </a>
                            </div>
                        </div>`
				})
				.join('')

			productDetailsDiv.innerHTML = createHTML
		})
		.catch(error => {
			console.error('Error:', error)
		})
}
