import { ProductModel } from '../models/Product';

export const getQty = (id: string, arr: ProductModel[]) => {
	const currentID = id.toLowerCase();
	return arr.filter((item) => item.id.toLowerCase() === currentID).length;
};
