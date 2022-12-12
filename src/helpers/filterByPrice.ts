import { ProductModel } from '../models/Product';

export const filterByPrice = (
	type: string,
	arr: ProductModel[] | undefined
) => {
	if (arr instanceof Array && type === 'declining') {
		const fltrdByPrice = arr.sort(
			(a: ProductModel, b: ProductModel) =>
				b.price - b.discount - (a.price - a.discount)
		);
		return fltrdByPrice;
	}

	if (arr instanceof Array && type === 'growing') {
		const fltrdByPrice = arr.sort(
			(a: ProductModel, b: ProductModel) =>
				a.price - a.discount - (b.price - b.discount)
		);
		return fltrdByPrice;
	}
	return;
};
