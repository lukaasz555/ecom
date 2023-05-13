import { ProductModel } from '../models/Product';
import { ResponseData } from '../models/ResponseData';
import { PaginationFilter } from '../models/PaginationFilter';
import axios from 'axios';

interface ProductResponse {
	status: number;
	data?: ProductModel;
}

interface ProductParams {
	id: string;
	password: string;
	price?: number;
	discount?: number;
	title?: string;
	authors?: string[];
	description?: string;
}

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchProducts = async (query: PaginationFilter) => {
	const res: ResponseData<ProductModel> = await axios
		.get(`${URL}/products`, {
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
	const res: ProductResponse = await axios
		.get(`${URL}/products/${productId}`, {
			params: {
				id: productId,
			},
		})
		.then((res) => {
			const respond: ProductResponse = {
				data: res.data,
				status: res.status,
			};
			return respond;
		})
		.catch((err) => {
			console.error(err);
			const respond: ProductResponse = {
				status: err.Response.status,
			};
			return respond;
		});
	return res;
};

export const fetchFilteredProducts = async (filter: PaginationFilter) => {
	const res: ResponseData<ProductModel> = await axios
		.get(`${URL}/products/${filter.category}/${filter.catID}`, {
			params: {
				page: filter.page,
				limit: filter.limit,
				catID: filter.catID,
			},
		})
		.then((res) => res.data)
		.catch((e) => console.error(e));
	return res;
};

export const addProduct = async (newProduct: ProductModel) => {
	const res = await axios.post(`${URL}/products`, newProduct);
	return res;
};

export const deleteProduct = async (
	params: ProductParams
): Promise<ProductResponse> => {
	const res = await axios.delete(`${URL}/products/${params.id}`, {
		params: {
			id: params.id,
		},
		data: {
			password: params.password,
		},
	});
	return {
		status: res.status,
	};
};

export const updateProduct = async (params: ProductParams) => {
	const res = await axios
		.put(`${URL}/products/${params.id}`, {
			password: params.password,
			price: params.price,
			discount: params.discount,
			title: params.title,
			authors: params.authors,
			description: params.description,
		})
		.then((res) => {
			return {
				status: res.status,
			};
		})
		.catch((e) => {
			return {
				status: e.response.status,
			};
		});
	return res;
};
