import { getContentType } from '@/api/api.helper'
import axios from 'axios'
import Cookies from 'js-cookie'
import { IAuthResponse, IEmailPassword } from './../store/user/user.interface'
import { saveToStorage } from './auth.helper'

export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await axios<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTOkens() {
		const refreshToken = Cookies.get('refrech-token')

		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + '/auth/login/access-token',
			{ refreshToken },
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}
