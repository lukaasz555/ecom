import { OrderModel } from '../models/Order';
import { ApiPaginationResponse, ApiResponse } from '../models/api';
import { PaginationFilter } from '../models/PaginationFilter';
import { NewOrderModel } from '../models/Order';
import axios from 'axios';
import { ChartData } from '../modules/Admin/components/CurrentSales/CurrentSales';

const URL = process.env.REACT_APP_SERVER_URL;

interface UpdateStatus {
	id: string;
	status?: string;
}

export const fetchUserOrders = async (customerId: string) => {
	return await axios
		.get(`${URL}/orders/${customerId}`)
		.then((res) => {
			// console.log(res);
			return res.data;
		})
		.catch((e) => console.log(e));
};

export const fetchOrders = async (
	query: PaginationFilter
): Promise<ApiPaginationResponse<OrderModel>> => {
	return await axios
		.get(`${URL}/orders`, {
			params: query,
		})
		.then((res) => res.data)
		.catch((e) => console.error(e));
};

export const fetchOrdersForChart = async (): Promise<
	ApiResponse<ChartData[]>
> => {
	return await axios
		.get(`${URL}/orders/sales`)
		.then((res) => {
			return {
				status: res.status,
				data: res.data,
			};
		})
		.catch((e) => ({ status: e.response.status }));
};

export const updateOrderStatus = async (
	obj: UpdateStatus
): Promise<ApiResponse<OrderModel>> => {
	return await axios
		.put(`${URL}/orders`, {
			id: obj.id,
			status: obj.status,
		})
		.then((res) => {
			return {
				status: res.status,
				data: res.data,
			};
		})
		.catch((e) => ({ status: e.response.status }));
};

export const addOrder = async (
	newOrder: NewOrderModel
): Promise<ApiResponse<OrderModel>> => {
	return await axios
		.post(`${URL}/orders`, newOrder)
		.then((res) => ({
			data: res.data,
			status: res.status,
		}))
		.catch((e) => ({ status: e.response.status }));
};
