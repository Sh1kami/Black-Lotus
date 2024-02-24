const productId = 5 // Замените на нужный идентификатор товара

fetch(`http://localhost:4200/api/products/${productId}`, {
	method: 'GET',
	headers: {
		Authorization: 'Bearer ' + token
	}
})
	.then(response => response.json())
	.then(productData => {
		if (!productData || !productData.images || !productData.reviews) {
			console.error('Invalid product data:', productData)
			return
		}

		const productDetailsDiv = document.getElementById('product-details')

		const imagesHTML = productData.images.map(image => `<img src="${image}" alt="Product Image">`).join('')

		const reviewsHTML = productData.reviews
			.map(
				review => `
            <div class="review">
           		<div class="review-name"><img src="${review.user.avatarPath}" alt="User Avatar"> ${review.user.name}</div>
                <p>${review.text}</p>
                <p>Оцінка: ${review.rating}/5</p>
                <p>Відгук від: ${new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
        `
			)
			.join('')

		const productHTML = `
            <div class="product-details">
			 <div class="product-images">${imagesHTML}</div>
				<div class="product-data">
              		<div class ="product-data-name">
						<h2>${productData.name}</h2>
					</div>
               		<p>Ціна: ${productData.price} UAH</p>
                	<p>${productData.description}</p>
				</div>
                <div class="product-reviews-container"> <h3>Відгуки</h3>
					<div class="product-reviews-container-inside">
                		<div class="product-reviews">${reviewsHTML}</div></div>
            		</div>
				</div>
			</div>
        `

		productDetailsDiv.innerHTML = productHTML
	})
	.catch(error => console.error('Error:', error))
