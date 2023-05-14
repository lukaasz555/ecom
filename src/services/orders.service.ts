import { OrderModel } from '../models/Order';
import { ResponseData } from '../models/ResponseData';
import { PaginationFilter } from '../models/PaginationFilter';
import { NewOrderModel } from '../models/Order';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

interface UpdateStatus {
	id: string;
	status?: string;
}

export const fetchOrders = async (query: PaginationFilter) => {
	const res: ResponseData<OrderModel> = await axios
		.get(`${URL}/orders`, {
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

export const fetchOrdersForChart = async () => {
	const res = await axios
		.get(`${URL}/orders/sales`)
		.then((res) => {
			return res.data;
		})
		.catch((e) => console.error(e));
	return res;
};

export const updateOrderStatus = async (
	obj: UpdateStatus
): Promise<number | void> => {
	const res = await axios
		.put(`${URL}/orders/${obj.id}`, {
			id: obj.id,
			status: obj.status,
		})
		.then((res) => res.status)
		.catch((e) => {
			console.error(e);
		});
	return res;
};

export const addOrder = async (newOrder: NewOrderModel) => {
	const res = await axios.post(`${URL}/orders`, newOrder);
	console.log(res);
	return res;
};
