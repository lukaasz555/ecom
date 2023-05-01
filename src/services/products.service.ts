import { ProductModel } from '../models/Product';
import { ResponseData } from '../models/ResponseData';
import axios from 'axios';

interface Filter {
	page: number;
	limit: number;
	catID?: number;
	category?: string;
}

export const fetchProducts = async (query: Filter) => {
	const res: ResponseData<ProductModel> = await axios
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
	const res: ResponseData<ProductModel> = await axios
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
