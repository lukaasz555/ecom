export interface ResponseData<T> {
	items: Array<T>;
	totalPages: number;
	currentPage: number;
}
