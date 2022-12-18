import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { ProductModel } from '../../models/Product';

interface CartState {
	//quantity: number;
	items: ProductModel[];
	uniqueItems: ProductModel[];
}

const initialState: CartState = {
	//quantity: 0,
	items: [],
	uniqueItems: [],
};

interface CartAction {
	type: string;
	payload: ProductModel;
}

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
			const ID = action.payload.id.toLowerCase();
			const itemsInArray = state.items.filter(
				(item) => item.id.toLowerCase() === ID
			);

			if (itemsInArray.length > 1) {
				const itemIndex = state.items.findIndex(
					(item) => item.id.toLowerCase() === ID
				);
				state.items.splice(itemIndex, 1);
			} else {
				state.uniqueItems.filter((item) => item.id.toLowerCase() !== ID);
				state.items = state.items.filter(
					(item) => item.id.toLowerCase() !== ID
				);
			}
		},
	},
});

export const { addItem, removeItem } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartUniqItems = (state: RootState) => state.cart.uniqueItems;

export default cartSlice.reducer;
