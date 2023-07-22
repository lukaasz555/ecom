import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ProductModel } from '../../models/Product';
import { fetchProducts } from '../../services/products.service';
import { PaginationFilter } from '../../models/PaginationFilter';
interface ProductsState {
	productsList: ProductModel[];
	isLoading: boolean;
	isError: boolean;
	product?: ProductModel;
}

const initState: ProductsState = {
	productsList: [],
	isLoading: false,
	isError: false,
	product: undefined,
};

export const getProductsList = createAsyncThunk(
	'products/getProductsList',
	async (query: PaginationFilter) => {
		console.log(query);
		return await fetchProducts(query);
	}
);

export const productsSlice = createSlice({
	name: 'products',
	initialState: initState,
	reducers: {
		loadData: (state, action: PayloadAction<ProductModel[]>) => {
			state.productsList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProductsList.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getProductsList.fulfilled, (state, action) => {
				state.productsList = action.payload.items;
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(getProductsList.rejected, (state) => {
				state.isError = true;
				state.isLoading = false;
				state.productsList = [];
			});
	},
});

export const { loadData } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.productsReducer;
export default productsSlice.reducer;
