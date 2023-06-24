import { OrderModel } from '../models/Order';
import { ApiPaginationResponse, ApiResponse } from '../models/api';
import { PaginationFilter } from '../models/PaginationFilter';
import { NewOrderModel } from '../models/Order';
import { ChartData } from '../modules/Admin/components/CurrentSales/CurrentSales';
import api from '../utils/api';

interface UpdateStatus {
	id: string;
	status?: string;
}

export const fetchOrders = async (
	query: PaginationFilter
): Promise<ApiPaginationResponse<OrderModel>> => {
	return await api
		.get('/orders', {
			params: query,
		})
		.then((res) => res.data)
		.catch((e) => console.error(e));
};

export const fetchUserOrders = async (customerId: string) => {
	return api
		.get(`orders/${customerId}`)
		.then((res) => res.data)
		.catch((e) => console.error(e));
};

export const fetchOrdersForChart = async (): Promise<
	ApiResponse<ChartData[]>
> => {
	return await api
		.get('orders/sales')
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
	return await api
		.put('orders', {
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
	return await api
		.post('orders', newOrder)
		.then((res) => ({
			data: res.data,
			status: res.status,
		}))
		.catch((e) => ({ status: e.response.status }));
};
