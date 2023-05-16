interface SearchResultParams {
	key: string;
	value?: string;
}

export const getQueryParams = (search: string): SearchResultParams => {
	const query = new URLSearchParams(search);
	const queryParams = {
		key: '',
	};
	if (search.includes('authors')) {
		Object.assign(queryParams, {
			key: 'authors',
			value: query.get('authors'),
		});
	}
	if (search.includes('publisher')) {
		Object.assign(queryParams, {
			key: 'publisher',
			value: query.get('publisher'),
		});
	}
	if (search.includes('label')) {
		Object.assign(queryParams, {
			key: 'label',
			value: query.get('label'),
		});
	}
	return queryParams;
};
