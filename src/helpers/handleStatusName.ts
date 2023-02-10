export const handleStatusName = (str: string) => {
	switch (str) {
		case 'new':
			return 'nowe';
		case 'pending':
			return 'realizowane';
		case 'cancelled':
			return 'anulowane';
		case 'completed':
			return 'zakończone';
		default:
			return str;
	}
};

export const handleNextStatus = (str: string) => {
	switch (str) {
		case 'new':
			return 'do realizacji';
		case 'nowe':
			return 'do realizacji';
		case 'pending':
			return 'zakończ';
	}
};
