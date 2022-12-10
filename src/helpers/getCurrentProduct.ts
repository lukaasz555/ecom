import { ProductModel } from '../models/Product';

export const getCurrentProduct = (id: string, arr: ProductModel[]) => {
	const curr: ProductModel[] = arr.filter((item) => item.id === id);
	return curr[0];
};
