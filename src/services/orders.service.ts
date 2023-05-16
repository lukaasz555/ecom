import { OrderModel } from '../models/Order';
import { ApiPaginationResponse, ApiResponse } from '../models/api';
import { PaginationFilter } from '../models/PaginationFilter';
import { NewOrderModel } from '../models/Order';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

interface UpdateStatus {
	id: string;
	status?: string;
}

export const fetchOrders = async (query: PaginationFilter) => {
	const res: ApiPaginationResponse<OrderModel> = await axios
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
			return {
				status: res.status,
				data: res.data,
			};
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
	const res: ApiResponse<OrderModel> = await axios.post(
		`${URL}/orders`,
		newOrder
	);
	return {
		data: res.data,
		status: res.status,
	};
};
