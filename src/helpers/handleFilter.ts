import { ProductModel } from '../models/Product';
import { handleCategoryNames } from './handleCategoryNames';

export const handleFilter = (
	str = '',
	e: React.MouseEvent | null,
	arr: ProductModel[]
) => {
	// show all products from picked category on SALE by clicking an url:
	if (str !== '') {
		const curr: ProductModel[] = arr.filter((item) => item.discount > 0);
		return curr;
	} else {
		if (e !== null) {
			const target = e.target as Element;
			const cat = handleCategoryNames(target.innerHTML);
			console.log('target: ', target.innerHTML);
			console.log('cat: ', handleCategoryNames(target.innerHTML));
			//handleFilter by clicking SALE in category's menu:
			if (arr.length > 0 && target.innerHTML === '99') {
				const curr: ProductModel[] = arr.filter((item) => item.discount > 0);
				return curr;
			}

			//handleFilter by clicking Categry in category's menu:
			if (arr.length > 0) {
				const curr: ProductModel[] = arr.filter(
					(item) => item.categoryID === cat
				);
				return curr;
			}
		}
	}
};
