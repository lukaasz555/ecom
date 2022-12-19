import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { ProductModel } from '../../models/Product';
import { getQty } from '../../helpers/getQty';

interface CartState {
	items: ProductModel[];
	uniqueItems: ProductModel[];
}

const initialState: CartState = {
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
				state.items.push(action.payload);
			} else {
				state.items.push(action.payload);
				state.uniqueItems.push(action.payload);
			}
		},

		removeItem: (state, action: PayloadAction<ProductModel>) => {
			const ID = action.payload.id.toLowerCase();

			if (getQty(ID, state.items) > 1) {
				const itemIndex = state.items.findIndex(
					(item) => item.id.toLowerCase() === ID
				);
				state.items.splice(itemIndex, 1);
			} else {
				state.uniqueItems = state.uniqueItems.filter(
					(item) => item.id.toLowerCase() !== ID
				);
				state.items = state.items.filter(
					(item) => item.id.toLowerCase() !== ID
				);
			}
		},

		removeID: (state, action: PayloadAction<ProductModel>) => {
			const ID = action.payload.id;
			state.items = state.items.filter((item) => item.id.toLowerCase() !== ID);
			state.uniqueItems = state.uniqueItems.filter(
				(item) => item.id.toLowerCase() !== ID
			);
		},

		clearCart: (state) => initialState,
	},
});

export const { addItem, removeItem, clearCart, removeID } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartUniqItems = (state: RootState) => state.cart.uniqueItems;

export default cartSlice.reducer;
