import {
	handleNextStatusName,
	setNextStatus,
} from '../../../helpers/handleStatusName';
import axios from 'axios';
import { useState } from 'react';

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
	const URL = process.env.REACT_APP_SERVER_URL;
	const [isLoading, setLoading] = useState(false);

	const handleStatusUpdate = () => {
		setLoading(true);
		axios
			.put(`${URL}/orders/${id}`, {
				id,
				status: setNextStatus(status),
			})
			.then((res) => {
				if (res.status === 200) {
					setMessage('Status zaktualizowany');
					setLoading(false);
				}
			})
			.catch((err) => {
				setMessage('Aktualizacja nieudana');
				setLoading(false);
			});
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
