import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { ProductModel } from '../../models/Product';

interface CartState {
	quantity: number;
	items: ProductModel[];
	uniqueItems: ProductModel[];
}

const initialState: CartState = {
	quantity: 0,
	items: [],
	uniqueItems: [],
};

interface CartAction {
	type: string;
	payload: ProductModel;
}

const checkArr = (arr: ProductModel[], id: string) => {
	const check = arr.map((item) => item.id === id);
	if (check.length === 0) {
		console.log('tego produktu nie było w koszyku');
		return true;
	} else {
		console.log('kolejna sztuka tego produktu');
		return false;
	}
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: CartAction) => {
			const uniqueIDs = new Set(
				state.items.map((item: ProductModel) => item.id)
			);

			if (uniqueIDs.has(action.payload.id)) {
				console.log('ten produkt juz byl');
				state.items.push(action.payload);
			} else {
				console.log('dodaje nowy produkt');
				state.items.push(action.payload);
				state.uniqueItems.push(action.payload);
			}
		},

		removeItem: (state, action: PayloadAction<ProductModel>) => {
			state.items = state.items.filter(
				(item) => item.id.toLowerCase() !== action.payload.id.toLowerCase()
			);
			if (state.items.length < 1) {
				return initialState;
			}
		},
	},
});

export const { addItem, removeItem } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartUniqItems = (state: RootState) => state.cart.uniqueItems;
export const selectCartTotalQty = (state: RootState) => state.cart.quantity;

export default cartSlice.reducer;
