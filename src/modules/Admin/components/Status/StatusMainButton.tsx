import {
	handleNextStatusName,
	setNextStatus,
} from '../../../../helpers/handleStatusName';
import { useState } from 'react';
import { updateOrderStatus } from '../../../../services/orders.service';

type StatusMainButtonProps = {
	status: string;
	id: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const StatusMainButton = ({
	status,
	id,
	setMessage,
}: StatusMainButtonProps) => {
	const [isLoading, setLoading] = useState(false);

	const handleStatusUpdate = () => {
		setLoading(true);
		updateOrderStatus({
			id,
			status: setNextStatus(status),
		})
			.then((res) => {
				if (res === 200) {
					setMessage('Status zaktualizowany');
				}
			})
			.catch((e) => {
				setMessage('Aktualizacja nieudana');
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			{status === 'completed' || status === 'cancelled' ? null : (
				<button
					className={`mx-3 p-2 text-white uppercase bg-brownSugar ${
						!isLoading ? 'cursor-pointer' : 'cursor-wait'
					} `}
					onClick={handleStatusUpdate}
					disabled={isLoading ? true : false}>
					{!isLoading ? handleNextStatusName(status) : 'Aktualizacja...'}
				</button>
			)}
		</>
	);
};

export default StatusMainButton;
