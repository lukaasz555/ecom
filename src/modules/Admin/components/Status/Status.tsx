import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import StatusMainButton from './StatusMainButton';
import StatusAltButton from './StatusAltButton';

type StatusProps = {
	id: string;
	status: string;
};

const Status = ({ id, status }: StatusProps) => {
	const [isOpen, setOpen] = useState(false);
	const [message, setMessage] = useState('');

	return (
		<div className='flex justify-between relative'>
			{isOpen ? (
				<div className='flex flex-col items-center absolute right-0 bottom-[-350%] bg-white px-6 py-4 text-[14px] border-[1px] border-solid border-black'>
					<button
						className='absolute right-3 top-1'
						onClick={() => {
							setOpen(false);
							setMessage('');
						}}>
						<FontAwesomeIcon icon={faX} size={'xs'} />
					</button>
					<div className='w-full flex justify-between items-center'>
						<StatusMainButton id={id} status={status} setMessage={setMessage} />

						<StatusAltButton id={id} setMessage={setMessage} status={status} />
					</div>

					{message !== '' && <p className='mt-3'>{message}</p>}
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
