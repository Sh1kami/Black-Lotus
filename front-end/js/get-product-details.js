document.addEventListener('DOMContentLoaded', function () {
	document.body.addEventListener('click', function (event) {
		var target = event.target

		var isProductCard = target.closest('.product-card')
		if (isProductCard || target.classList.contains('product-card__more') || target.classList.contains('product-card__name')) {
			var productId = isProductCard ? isProductCard.getAttribute('data-product-id') : target.closest('.product-card').getAttribute('data-product-id')

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
						<a href="#" class="product-details__close"><button type="button" class="product-details__close-btn">Назад</button></a>
					</div>
               		<p>Ціна: ${productData.price} UAH</p>
                	<p>${productData.description}</p>
					<button type="button" class="product-details__add-to-cart">Додати до кошику</button>
				</div>
                <div class="product-reviews-container"> <h3 class="product-reviews-title">Відгуки</h3>
					<div class="product-reviews-container-inside">
                		<div class="product-reviews">${reviewsHTML}</div></div>
            		</div>
				</div>
			</div>
        `

					productDetailsDiv.innerHTML = productHTML
				})
				.catch(error => console.error('Error:', error))
		}

		if (target.classList.contains('product-details__close-btn')) {
			toggleSectionsVisibility()
		}
	})
})
