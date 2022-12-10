export interface ProductModel {
	id: string;
	title: string;
	authors: string[];
	releaseYear: string;
	description: string;
	img: string;
	price: number;
	discount: number;
	category: string;
	// ??

	pages?: number;
	language?: string;
	label?: string;
	publisher?: string;
}

export interface ProductModel2 {
	data: {
		id: string;
		title: string;
		authors: string[];
		releaseYear: string;
		description: string;
		img: string;
		price: number;
		discount: number;
		category: string;
		// ??

		pages?: number;
		language?: string;
		label?: string;
		publisher?: string;
	};
}
