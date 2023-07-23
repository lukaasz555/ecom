export interface PaginationFilter {
	page: number;
	limit: number;
	catID?: number;
	category?: string;
	searchPhrase?: string | null;
}

export class PaginationData {
	pageNumber: number;
	pageSize: number;
	catID?: number;
	category?: string;
	searchPhrase? = '';
	desc?: boolean;

	constructor(pageNumber?: number, pageSize?: number) {
		this.pageNumber = pageNumber || 1;
		this.pageSize = pageSize || 10;
	}
}
