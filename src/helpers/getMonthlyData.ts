import { getOrdersByMonth } from './getOrdersByMonth';
import { handleMonthName } from './handleMonthName';
import { getTypesQty } from './getTypesQty';
import { OrderModel } from '../models/Order';

export const getMonthlyData = (arr: OrderModel[], item: string) => {
	const ordersArray = getOrdersByMonth(arr, item);
	const obj = {
		name: handleMonthName(item),
		orders: ordersArray.length,
		books: getTypesQty(ordersArray, 'books'),
		albums: getTypesQty(ordersArray, 'albums'),
	};
	return obj;
};
