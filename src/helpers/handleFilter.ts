import { ProductModel } from '../models/Product';
import { handleCategoryNames } from './handleCategoryNames';

export const handleFilter = (
	cat: number,
	e: React.MouseEvent | null,
	arr: ProductModel[]
) => {
	if (cat === 99) {
		return arr.filter((item) => item.discount > 0);
	} else {
		return arr.filter((item) => item.categoryID === cat);
	}
};
