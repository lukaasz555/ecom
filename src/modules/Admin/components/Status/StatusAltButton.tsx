import { useState } from 'react';
import { updateOrderStatus } from '../../../../services/orders.service';
import { OrderStatusesEnum } from '../../../../enums/OrderStatusesEnum';

type StatusAltButtonProps = {
	id: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	status: string;
	operationSuccess: (t: string) => void;
};

const StatusAltButton = ({
	id,
	setMessage,
	status,
	operationSuccess,
}: StatusAltButtonProps) => {
	const [isLoading, setLoading] = useState(false);

	const handleOrderCancelling = () => {
		setLoading(true);
		updateOrderStatus({
			id,
			status: OrderStatusesEnum.Cancelled,
		})
			.then((res) => {
				if (res.status === 200) {
					operationSuccess('Zamówienie zostało anulowane');
				}
			})
			.catch((e) => setMessage('Nie udało się anulować zamówienia'))
			.finally(() => setLoading(false));
	};

	return (
		<>
			{status !== OrderStatusesEnum.Cancelled ? (
				<button
					className={`mx-3 lowercase py-2 px-3 ${
						isLoading ? 'no-underline cursor-wait' : 'underline cursor-pointer'
					}`}
					disabled={isLoading ? true : false}
					onClick={handleOrderCancelling}>
					{isLoading ? 'aktualizacja ...' : 'anuluj'}
				</button>
			) : null}
		</>
	);
};

export default StatusAltButton;
