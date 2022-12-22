import { ProductModel } from './Product';

export interface OrderModel {
	orderId: string;
	customer: {
		customerData: {
			name: string;
			lastname: string;
			nip?: string;
			companyName?: string;
		};
		contact: {
			email: string;
			phoneNumber: string;
		};
		address: {
			address1: string;
			address2: string;
			postalCode: string;
			country: string;
		};
	};

	order: {
		cart: {
			items: ProductModel[];
		};
		qty: number;
		value: number;
		ship: {
			inpost: string;
		};
	};
}