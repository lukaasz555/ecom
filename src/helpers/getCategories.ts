import { ProductModel } from '../models/Product';

// get all categories of products:
export const getCategories = (arr: ProductModel[]) => {
	const categories = new Set(arr.map((item) => item.category));
	const arrayOfCategories = Array.from(categories);
	return [...arrayOfCategories, 'sale'];
};
