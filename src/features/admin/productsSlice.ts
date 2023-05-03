import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ProductModel } from '../../models/Product';

interface ProductsState {
	products: ProductModel[];
}

const initState: ProductsState = {
	products: [],
};

export const productsSlice = createSlice({
	name: 'products',
	initialState: initState,
	reducers: {
		loadData: (state, action: PayloadAction<ProductModel[]>) => {
			state.products = action.payload;
		},
	},
});

export const { loadData } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.productsReducer;
export default productsSlice.reducer;
