import { ProductModel } from './Product';

export interface OrderModel {
	items: ProductModel[];
	qty: number;
	value: number;
	ship: {
		inpost: string;
		cost: number;
	};
}

export interface CustomerModel {
	customerId: string;
	customerName: string;
	customerEmail: string;
	newsletterConsent: boolean;
	orders: OrderModel[];
}
