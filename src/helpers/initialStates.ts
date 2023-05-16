import { ProductModel } from '../models/Product';
import { ICheckoutForm } from '../models/CheckoutData';
import { ProductTypesEnum } from '../enums/ProductTypesEnum';

export const initialCheckoutForm: ICheckoutForm = {
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

export const initialProductModel: ProductModel = {
	id: crypto.randomUUID().slice(0, 3),
	title: '',
	authors: [''],
	releaseYear: '',
	description: '',
	img: 'https://ecsmedia.pl/b/mp/img/defaults/w.gif',
	price: 0,
	discount: 0,
	categoryID: 0,
	format: '',
	type: ProductTypesEnum.Book,
	thumbnail: 'https://ecsmedia.pl/b/mp/img/defaults/w.gif',
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
