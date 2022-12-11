import { ProductModel } from '../models/Product';

export const handleFilter = (e: React.MouseEvent, arr: ProductModel[]) => {
	const target = e.target as Element;
	const cat = target.innerHTML.toLowerCase();
	//handleFilter by SALE:
	if (arr.length > 0 && cat === 'sale') {
		const curr: ProductModel[] = arr.filter((item) => item.discount > 0);
		return curr;
	}
	//handleFilter by Category:
	if (arr.length > 0) {
		const curr: ProductModel[] = arr.filter(
			(item) => item.category.toLowerCase() === cat
		);
		return curr;
	}
	return;
};
