import { instance } from '@/api/api.interceptor'
import { IProduct } from '@/types/product.interface'

import {
	PRODUCTS,
	TypeProductData,
	TypeProductDataFilters
} from './product.types'

export const ProductService = {
	async getAll(queryData = {} as TypeProductDataFilters) {
		return instance<IProduct[]>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		})
	},

	async getSimilar(id: string | number) {
		return instance<IProduct[]>({
			url: `${PRODUCTS}/similar/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return instance<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async getByCategory(categorySlug: string) {
		return instance<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'GET'
		})
	},

	async create() {
		return instance<IProduct>({
			url: PRODUCTS,
			method: 'POST'
		})
	},

	async update(id: string | number, data: TypeProductData) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'PUT',
			data
		})
	},

	async delete(id: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'DELETE'
		})
	}
}
