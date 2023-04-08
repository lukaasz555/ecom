import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { OrderModel } from '../../models/Order';
import axios from 'axios';

interface OrderResponse {
	orders: OrderModel[];
	totalPages: number;
	currentPage: number;
}

export const fetchOrders = async (query: Record<string, unknown>) => {
	const res: OrderResponse = await axios
		.get(`${process.env.REACT_APP_SERVER_URL}/orders`, {
			params: {
				query: query,
			},
		})
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log(e);
		});
	return res;
};

interface OrdersState {
	orders: OrderModel[];
}

const initialState: OrdersState = { orders: [] };

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		loadData: (state, action: PayloadAction<OrderModel[]>) => {
			state.orders = action.payload;
		},
	},
});

export const { loadData } = ordersSlice.actions;
export const selectOrders = (state: RootState) => state.ordersReducer.orders;
export default ordersSlice.reducer;
