import { ProductModel } from '../models/Product';

// get all categories of products:
export const getCategories = (arr: ProductModel[]) => {
	const categories = new Set(arr.map((item) => item.categoryID));
	const cats: number[] = Array.from(categories);
	const arrayOfCategories: number[] = [...cats, 99];
	return arrayOfCategories;
};
