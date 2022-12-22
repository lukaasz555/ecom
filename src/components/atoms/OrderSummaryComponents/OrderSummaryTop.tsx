import React from 'react';

interface IOrderSumTop {
	setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderSummaryTop = ({ setFormFilled }: IOrderSumTop): JSX.Element => {
	return (
		<div className='flex justify-between items-start'>
			<h1 className='text-xl font-[400] font-lato mb-2'>
				Podsumowanie zamówienia
			</h1>
			<button
				onClick={() => setFormFilled(false)}
				className='hover:underline text-pencil text-s'>
				Zmień dane
			</button>
		</div>
	);
};

export default OrderSummaryTop;
