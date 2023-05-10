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

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchProducts = async (query: Filter) => {
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
	const res: ExactProductRes = await axios
		.get(`${URL}/products/${productId}`, {
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

export const postNewProduct = async (newProduct: ProductModel) => {
	const res = await axios.post(`${URL}/products/add`, newProduct);
	return res;
};

interface DeleteParams {
	id: string;
	password: string;
}

interface DeleteRes {
	status: number;
}

export const deleteProduct = async (
	params: DeleteParams
): Promise<DeleteRes> => {
	const res = await axios.delete(`${URL}/products/remove/${params.id}`, {
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
