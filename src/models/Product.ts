export interface ProductModel {
	id: string;
	title: string;
	authors: string[];
	releaseYear: string;
	description: string;
	img: string;
	price: number;
	discount: number;
	categoryID: string;
	format: string;
	type: 'books' | 'albums';
	//
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
		categoryID: string;
		format: string;
		type: 'books' | 'albums';
		//
		pages?: number;
		language?: string;
		label?: string;
		publisher?: string;
	};
}
