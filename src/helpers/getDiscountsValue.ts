import { ProductModel } from '../models/Product';

export const getDiscountsValue = (arr: ProductModel[]) => {
	if (arr.length > 0) {
		const val = arr.reduce((acc: number, item: { discount: number }) => {
			return acc + item.discount;
		}, 0);
		return val;
	} else {
		return 0;
	}
};
