import { ProductModel } from '../models/Product';
import { ApiResponse, ApiPaginationResponse } from '../models/api';
import { PaginationFilter } from '../models/PaginationFilter';
import axios from 'axios';

interface ProductParams {
	id: string;
	password: string;
	price?: number;
	discount?: number;
	title?: string;
	authors?: string[];
	description?: string;
}

interface SearchProductParams {
	key?: string;
	value?: string;
	type?: string;
	searchPhrase?: string;
}

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchProducts = async (query: PaginationFilter) => {
	const res: ApiPaginationResponse<ProductModel> = await axios
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
	const res: ApiResponse<ProductModel> = await axios
		.get(`${URL}/products/${productId}`, {
			params: {
				id: productId,
			},
		})
		.then((res) => {
			return {
				data: res.data,
				status: res.status,
			};
		})
		.catch((err) => {
			console.error(err);
			const respond: ApiResponse<ProductModel> = {
				status: err.Response.status,
			};
			return respond;
		});
	return res;
};

export const fetchFilteredProducts = async (filter: PaginationFilter) => {
	const res: ApiPaginationResponse<ProductModel> = await axios
		.get(`${URL}/products/${filter.category}/${filter.catID}`, {
			params: {
				page: filter.page,
				limit: filter.limit,
				catID: filter.catID || 99,
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
): Promise<ApiResponse<ProductModel>> => {
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

export const searchProduct = async (params: SearchProductParams) => {
	const res: ApiResponse<ProductModel[]> = await axios
		.get(`${URL}/products/search`, {
			params: {
				params,
			},
		})
		.then((res) => {
			return {
				status: res.status,
				data: res.data,
			};
		})
		.catch((e) => {
			console.error(e);
			return {
				status: e.Response.status,
			};
		});
	return res;
};
