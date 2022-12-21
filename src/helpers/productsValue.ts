import { ProductModel } from '../models/Product';

export const productsValue = (arr: ProductModel[]) => {
	if (arr.length > 0) {
		const val = arr.reduce(
			(acc: number, item: { price: number; discount: number }) => {
				return acc + (item.price - item.discount);
			},
			0
		);
		return val;
	} else {
		return 0;
	}
};
