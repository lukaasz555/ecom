import moment from 'moment';
import { OrderModel } from '../models/Order';

export const getOrdersByMonth = (arr: OrderModel[], date: string) => {
	const orders = arr.filter(
		(item) => moment(item.createdAt).format('M') === date
	);
	return orders;
};
