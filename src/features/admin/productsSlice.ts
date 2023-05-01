import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ProductModel } from '../../models/Product';
import axios from 'axios';

interface ProductsResponse {
	products: ProductModel[];
	totalPages: number;
	currentPage: number;
}

interface ProductsState {
	products: ProductModel[];
}

const initState: ProductsState = {
	products: [],
};

interface FilteredQuery {
	currentPage: number;
	itemsPerPage: number;
	catID?: number;
	category?: string;
}

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
export const selectProducts = (state: RootState) => state.productReducer;
export default productsSlice.reducer;
