function toggleSectionsVisibility() {
	var productsSection = document.querySelector('.main__products-by-category')
	var detailsSection = document.querySelector('.main__product-details')
	var categoryTitle = document.querySelector('.main__category-title')
	var productTitle = document.querySelector('.main__product-title')

	productsSection.classList.toggle('hidden')
	detailsSection.classList.toggle('hidden')
	categoryTitle.classList.toggle('hidden')
	productTitle.classList.toggle('hidden')
}

document.addEventListener('DOMContentLoaded', function () {
	document.body.addEventListener('click', function (event) {
		var target = event.target

		var isProductCard = target.closest('.product-card')

		if (isProductCard) {
			toggleSectionsVisibility()
		}
	})
})
