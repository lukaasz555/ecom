import { ProductTypeEnum } from '../enums/ProductTypesEnum';
export interface ProductModel {
	id: string;
	title: string;
	authors: string[];
	releaseYear: string;
	description: string;
	img: string;
	thumbnail: string;
	price: number;
	discount: number;
	categoryID: number;
	format: string;
	type: ProductTypeEnum;
	pages?: number;
	language?: string;
	label?: string;
	publisher?: string;
}
