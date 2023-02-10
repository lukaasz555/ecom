import { ProductModel } from '../models/Product';

export const getNameOfProduct: (
	arr: ProductModel[],
	id: string
) => string | null = (products: ProductModel[], id: string) => {
	const currentProduct = products.find((p) => p.id === id);
	if (currentProduct) return currentProduct.title;
	return null;
};

export const getTypeOfProduct: (arr: ProductModel[], id: string) => string = (
	products: ProductModel[],
	id: string
) => {
	const currentProduct = products.find((p) => p.id === id);
	if (currentProduct) return currentProduct.type;
	return '';
};
