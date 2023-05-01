import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { OrderModel } from '../../models/Order';

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
