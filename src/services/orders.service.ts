import { OrderModel } from '../models/Order';
import { ResponseData } from '../models/ResponseData';
import axios from 'axios';

export const fetchOrders = async (query: Record<string, unknown>) => {
	const res: ResponseData<OrderModel> = await axios
		.get(`${process.env.REACT_APP_SERVER_URL}/orders`, {
			params: {
				query: query,
			},
		})
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.error(e);
		});
	return res;
};
