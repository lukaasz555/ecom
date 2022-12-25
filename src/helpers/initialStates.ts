export const initialCheckoutForm = {
	email: {
		emailAddress: '',
		isConsent: false,
	},

	invoice: {
		name: '',
		lastname: '',
		companyName: '',
		nip: '',
		address1: '',
		address2: '',
		city: '',
		postalCode: '',
		country: '',
		isInvoice: false,
	},

	ship: {
		phoneNumber: '',
		inpost: '',
	},
};

export const initialProductModel = {
	id: '',
	title: '',
	authors: [''],
	releaseYear: '',
	description: '',
	img: '',
	price: 0,
	discount: 0,
	categoryID: 0,
	format: '',
	type: 'books',
};

export const initialOrderModel = {
	items: initialProductModel,
	qty: 0,
	value: 0,
	ship: {
		inpost: '',
		cost: 0,
	},
};

export const initialCustomerModel = {
	customerId: '',
	customerName: '',
	customerEmail: '',
	newsletterConsent: false,
	orders: [initialOrderModel],
};
