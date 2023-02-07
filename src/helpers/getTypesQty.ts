import { OrderModel } from '../models/Order';

export const getTypesQty = (arr: OrderModel[], type: 'albums' | 'books') => {
	let qty = 0;
	arr.filter((obj) =>
		obj.order.items.map((item) => item.type === type && qty++)
	);
	return qty;
};
