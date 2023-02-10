import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

type StatusProps = {
	id: string;
	status: string;
};

const Status = ({ id, status }: StatusProps) => {
	const URL = process.env.REACT_APP_SERVER_URL;
	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		console.log('Aktualny status tego zam to ' + status);
	}, []);

	const printInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as Element;
		console.log(target.innerHTML);
	};

	const handleStatusChange = () => {
		axios
			.put(`${URL}/orders/${id}`, {
				id,
				status,
			})
			.then((res) => console.log(res.data));
	};

	return (
		<div className='flex justify-between relative'>
			{isOpen ? (
				<div className='absolute right-0 bottom-[-250%] bg-white px-6 py-4 text-[14px] border-[1px] border-solid border-black'>
					<button
						className='absolute right-3 top-1'
						onClick={() => setOpen(false)}>
						<FontAwesomeIcon icon={faX} size={'xs'} />
					</button>
					<button
						className='mx-3 text-white bg-brownSugar uppercase p-2'
						//onClick={(e: React.MouseEvent<HTMLButtonElement>) => printInfo(e)}
						onClick={handleStatusChange}>
						do realizacji
					</button>
					<button className='mx-3 underline uppercase p-2'>anuluj</button>
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
