export const handleCategoryNames = (data: string) => {
	switch (data) {
		case '10':
			return 'literatura faktu';
		case '13':
			return 'biografie';
		case '17':
			return 'finanse';
		case '19':
			return 'literatura piękna';
		case '22':
			return 'kryminał';
		case '26':
			return 'rozwój';
		case '39':
			return 'pop';
		case '41':
			return 'rap';
		case '44':
			return 'alt';
		case '45':
			return 'rock';
		case '99':
			return 'sale';
		default:
			return;
	}
};
