import axios from 'axios';
import { useState } from 'react';

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
	const URL = process.env.REACT_APP_SERVER_URL;
	const [isLoading, setLoading] = useState(false);

	const handleOrderCancelling = () => {
		setLoading(true);
		axios
			.put(`${URL}/orders/${id}`, {
				id,
				status: 'cancelled',
			})
			.then((res) => {
				if (res.status === 200) {
					operationSuccess('Zamówienie zostało anulowane');
					setLoading(false);
				}
			})
			.catch((err) => {
				setMessage('Nie udało się anulować');
				setLoading(false);
			});
	};

	return (
		<>
			{status !== 'cancelled' ? (
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
