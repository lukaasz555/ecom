import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { handleNextStatus } from '../../../helpers/handleStatusName';

type StatusProps = {
	id: string;
	status: string;
};

const Status = ({ id, status }: StatusProps) => {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [isOpen, setOpen] = useState(false);
	const [isError, setError] = useState(false);

	const nextStatus = (str: string) => {
		if (str === 'new' || str === 'nowe') return 'pending';
		if (str === 'pending' || str === 'realizowane') return 'completed';
	};

	const handleStatusChange = () => {
		console.log({
			id,
			status: nextStatus(status),
		});
		axios
			.put(`${URL}/orders/${id}`, {
				id,
				status: nextStatus(status),
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setOpen(false);
					setError(false);
				}
			})
			.catch((err) => {
				setError(true);
			});
	};

	return (
		<div className='flex justify-between relative'>
			{isOpen ? (
				<div className='flex flex-col items-center absolute right-0 bottom-[-350%] bg-white px-6 py-4 text-[14px] border-[1px] border-solid border-black'>
					<button
						className='absolute right-3 top-1'
						onClick={() => setOpen(false)}>
						<FontAwesomeIcon icon={faX} size={'xs'} />
					</button>
					<div className='w-full flex justify-between items-center'>
						{status === 'completed' || status === 'cancelled' ? null : (
							<button
								className='mx-3 text-white bg-brownSugar uppercase p-2'
								onClick={handleStatusChange}>
								{handleNextStatus(status)}
							</button>
						)}

						<button className='mx-3 underline uppercase p-2'>anuluj</button>
					</div>

					{isError && <p className='mt-3'>Aktualizacja nieudana</p>}
				</div>
			) : null}

			<p className='font-[500]'>Zamówienie nr: {id}</p>
			<button
				className='border-solid border-[1px] py-1 px-2 text-[14px] uppercase'
				onClick={() => setOpen(!isOpen)}>
				zmień status
			</button>
		</div>
	);
};

export default Status;
