export interface ApiUserResponse {
	status: number;
	token?: string;
}

export interface ApiResponse<T> {
	status: number;
	data?: T;
}

export interface ApiPaginationResponse<T> {
	items: Array<T>;
	totalPages: number;
	currentPage: number;
}
