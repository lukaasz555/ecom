import { ProductModel } from './Product';

export interface OrderModel {
	_id: string;
	createdAt: string;
	status: string;
	newsletter: boolean;
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
			address2?: string;
			postalCode: string;
			city: string;
			country: string;
		};
	};

	order: {
		items: ProductModel[];
		qty: number;
		value: number;
		ship: {
			inpost: string;
			cost: number;
		};
	};
}

export interface NewOrderModel {
	// status: string;
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
			newsletter: boolean;
		};
		address: {
			address1: string;
			address2?: string;
			postalCode: string;
			city: string;
			country: string;
		};
	};
	order: {
		items: ProductModel[];
		qty: number;
		value: number;
		ship: {
			inpost: string;
			cost: number;
		};
	};
}
