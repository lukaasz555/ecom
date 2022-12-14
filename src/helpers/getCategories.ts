import { ProductModel } from '../models/Product';

// get all categories of products:
export const getCategories = (arr: ProductModel[]) => {
	const categories = new Set(arr.map((item) => item.categoryID));
	const cats: string[] = Array.from(categories);
	return [...cats, '99'];
};
