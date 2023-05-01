import { ProductModel } from '../models/Product';
import axios from 'axios';

interface ProductsResponse {
	products: ProductModel[];
	totalPages: number;
	currentPage: number;
}

interface Filter {
	page: number;
	limit: number;
	catID?: number;
	category?: string;
}

export const fetchProducts = async (query: Filter) => {
	const res: ProductsResponse = await axios
		.get(`${process.env.REACT_APP_SERVER_URL}/products`, {
			params: {
				query: query,
			},
		})
		.then((res) => res.data)
		.catch((e) => {
			console.error(e);
		});
	return res;
};

export const fetchFilteredProducts = async (filter: Filter) => {
	const res: ProductsResponse = await axios
		.get(
			`${process.env.REACT_APP_SERVER_URL}/products/${filter.category}/${filter.catID}`,
			{
				params: {
					page: filter.page,
					limit: filter.limit,
					catID: filter.catID,
				},
			}
		)
		.then((res) => res.data)
		.catch((e) => console.error(e));
	return res;
};
