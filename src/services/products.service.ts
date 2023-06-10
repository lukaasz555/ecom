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

export const fetchExactProduct = async (
	productId: string
): Promise<ApiResponse<ProductModel>> => {
	return await axios
		.get(`${URL}/products/${productId}`)
		.then((res) => ({
			data: res.data,
			status: res.status,
		}))
		.catch((err) => ({ status: err.response.status }));
};

export const fetchFilteredProducts = async (
	filter: PaginationFilter
): Promise<ApiPaginationResponse<ProductModel>> => {
	return await axios
		.get(`${URL}/products/${filter.category}/${filter.catID}`, {
			params: {
				page: filter.page,
				limit: filter.limit,
				catID: filter.catID || 99,
			},
		})
		.then((res) => res.data)
		.catch((e) => console.error(e));
};

export const fetchCategories = async (
	category: string
): Promise<ApiResponse<Array<number>>> => {
	return await axios
		.get(`${URL}/products/categories`, {
			params: { category },
		})
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
};

export const addProduct = async (
	newProduct: ProductModel
): Promise<ApiResponse<ProductModel>> => {
	return await axios
		.post(`${URL}/products`, newProduct)
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
};

export const deleteProduct = async (
	params: ProductParams
): Promise<ApiResponse<ProductModel>> => {
	return await axios
		.delete(`${URL}/products`, {
			data: {
				id: params.id,
				password: params.password,
			},
		})
		.then((res) => res.status)
		.catch((e) => e.response.status);
};

export const updateProduct = async (
	params: ProductParams
): Promise<ApiResponse<ProductModel>> => {
	return await axios
		.put(`${URL}/products`, {
			id: params.id,
			password: params.password,
			price: params.price,
			discount: params.discount,
			title: params.title,
			authors: params.authors,
			description: params.description,
		})
		.then((res) => ({
			data: res.data,
			status: res.status,
		}))
		.catch((e) => ({ status: e.response.status }));
};

export const fetchProducts = async (
	query: PaginationFilter
): Promise<ApiPaginationResponse<ProductModel>> => {
	return await axios
		.get(`${URL}/products`, {
			params: query,
		})
		.then((res) => res.data)
		.catch((e) => console.error(e));
};

export const searchProduct = async (
	query: SearchProductParams
): Promise<ApiResponse<ProductModel[]>> => {
	return await axios
		.get(`${URL}/products/search`, {
			params: {
				key: query.key,
				value: query.value,
				type: query.type,
				searchPhrase: query.searchPhrase,
			},
		})
		.then((res) => ({
			data: res.data,
			status: res.status,
		}))
		.catch((e) => ({ status: e.response.status }));
};
