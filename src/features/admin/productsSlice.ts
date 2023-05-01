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

interface PaginationQuery {
	[key: string]: number;
}

interface ProductsState {
	products: ProductModel[];
}

const initState: ProductsState = {
	products: [],
};

export const fetchProducts = async (query: PaginationQuery) => {
	const res: ProductsResponse = await axios
		.get(`${process.env.REACT_APP_SERVER_URL}/products`, {
			params: {
				query: query,
			},
		})
		.then((res) => res.data)
		.catch((e) => {
			// console.log('errorek');
			// console.log(e);
		});
	return res;
};

interface FilteredQuery {
	currentPage: number;
	itemsPerPage: number;
	catID?: number;
	category?: string;
}

export const fetchFilteredProducts = async (filter: FilteredQuery) => {
	const res: ProductsResponse = await axios
		.get(
			`${process.env.REACT_APP_SERVER_URL}/products/${filter.category}/${filter.catID}`,
			{
				params: {
					page: filter.currentPage,
					limit: filter.itemsPerPage,
					catID: filter.catID,
				},
			}
		)
		.then((res) => res.data)
		.catch((e) => console.log(e));
	return res;
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
export const selectProducts = (state: RootState) => state.productReducer;
export default productsSlice.reducer;
