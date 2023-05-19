import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import StatusMainButton from './StatusMainButton';
import StatusAltButton from './StatusAltButton';
import { OrderStatusesEnum } from '../../../../enums/OrderStatusesEnum';

type StatusProps = {
	id: string;
	status: string;
};

const Status = ({ id, status }: StatusProps) => {
	const [isOpen, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [areButtonsVisible, setButtonsVisible] = useState(true);

	const operationSuccess = (text: string) => {
		setButtonsVisible(false);
		setMessage(text);
		setTimeout(() => {
			setOpen(false);
		}, 700);
	};

	return (
		<div className='flex justify-between relative'>
			{isOpen ? (
				<div className='h-[100px] w-[280px] flex flex-col items-center justify-center absolute right-0 bottom-[-350%] bg-white px-6 py-4 text-[14px] border-[1px] border-solid border-black'>
					<button
						className='absolute right-3 top-1'
						onClick={() => {
							setOpen(false);
							setMessage('');
						}}>
						<FontAwesomeIcon icon={faX} size={'xs'} />
					</button>
					{areButtonsVisible ? (
						<div className='flex'>
							<StatusMainButton
								id={id}
								status={status}
								setMessage={setMessage}
								operationSuccess={operationSuccess}
							/>

							<StatusAltButton
								id={id}
								setMessage={setMessage}
								status={status}
								operationSuccess={operationSuccess}
							/>
						</div>
					) : (
						<p className='mt-3'>{message}</p>
					)}
					<div className='w-full flex justify-between items-center'></div>

					{message !== '' && areButtonsVisible ? (
						<p className='mt-3'>{message}</p>
					) : null}
				</div>
			) : null}

			<p className='font-[500]'>Zamówienie nr: {id}</p>
			{status === OrderStatusesEnum.Cancelled ? (
				<p className='text-[13px] uppercase text-pencil'>
					zamówienie anulowane
				</p>
			) : (
				<button
					className='border-solid border-[1px] py-1 px-2 text-[14px] uppercase'
					onClick={() => setOpen(!isOpen)}>
					zmień status
				</button>
			)}
		</div>
	);
};

export default Status;
