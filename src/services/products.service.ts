import { ProductModel } from '../models/Product';
import { ResponseData } from '../models/ResponseData';
import axios from 'axios';

interface Filter {
	page: number;
	limit: number;
	catID?: number;
	category?: string;
}

interface ExactProductRes {
	status: number;
	data: ProductModel | null;
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

export const fetchExactProduct = async (productId: string) => {
	const res: ExactProductRes = await axios
		.get(`${process.env.REACT_APP_SERVER_URL}/products/${productId}`, {
			params: {
				id: productId,
			},
		})
		.then((res) => {
			const respond: ExactProductRes = {
				data: res.data,
				status: res.status,
			};
			return respond;
		})
		.catch((err) => {
			console.log('sdadasdsadsadas', err);
			console.error(err);
			const respond: ExactProductRes = {
				data: null,
				status: err.Response.status,
			};
			return respond;
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
