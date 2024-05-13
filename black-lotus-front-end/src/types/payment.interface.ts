interface Amount {
	value: string
	currency: string
}

interface Recipient {
	account_id: string
	geteway_id: string
}

interface PaymentMethod {
	type: string
	id: string
	saved: boolean
}

interface Confirmation {
	type: string
	return_url: string
	confirm_url: string
}

export interface IPaymentResponse {
	id: string
	status: string
	amount: Amount
	recipient: Recipient
	payment_method: PaymentMethod
}
