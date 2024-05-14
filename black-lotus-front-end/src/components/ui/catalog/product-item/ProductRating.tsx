import { ReviewService } from '@/services/review.service'
import { IProduct } from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
	const {} = useQuery(
		['get product rating', product.id],
		ReviewService.getAverageByProduct()
	)

	return (
		<div className={styles.rating}>
			<span>Review:</span>
			<Rating
				readonly
				initialValue={rating}
				SVGstyle={{ display: 'inline-block' }}
				size={34}
				allowFraction
				transition
			/>
		</div>
	)
}

export default ProductRating
