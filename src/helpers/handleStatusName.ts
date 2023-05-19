import { OrderStatusesEnum } from '../enums/OrderStatusesEnum';

export const handleStatusName = (str: string) => {
	switch (str) {
		case OrderStatusesEnum.New:
			return 'nowe';
		case OrderStatusesEnum.Pending:
			return 'realizowane';
		case OrderStatusesEnum.Cancelled:
			return 'anulowane';
		case OrderStatusesEnum.Completed:
			return 'zakończone';
		default:
			return str;
	}
};

export const setNextStatus = (str: string) => {
	if (str === OrderStatusesEnum.New || str === 'nowe') return 'pending';
	if (str === OrderStatusesEnum.Pending || str === 'realizowane')
		return OrderStatusesEnum.Completed;
};

export const handleNextStatusName = (str: string) => {
	switch (str) {
		case OrderStatusesEnum.New:
			return 'do realizacji';
		case 'nowe':
			return 'do realizacji';
		case OrderStatusesEnum.Pending:
			return 'zakończ';
		default:
			return str;
	}
};
