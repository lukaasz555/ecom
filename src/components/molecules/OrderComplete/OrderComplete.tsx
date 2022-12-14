import React from 'react';
import ALT from '../../atoms/ALT/ALT';

const OrderComplete = ({ orderId }: { orderId: string }) => {
	return (
		<div className='w-full flex flex-col justify-center items-center font-lato py-4 px-5 lg:px-10'>
			<h1 className='text-xl font-[400] font-lato mb-8'>
				Dziękujemy za złożenie zamówienia!
			</h1>
			{orderId ? (
				<div className='flex flex-col items-center w-full gap-y-2 mb-5'>
					<p className='text-l'>
						Numer Twojego zamówienia to: <br />
						<span className='font-[600]'>{orderId}</span>
					</p>
					<p>O zmianie statusu zamówienia zostaniesz poinformowany mejlem.</p>
				</div>
			) : null}

			<div className='mt-10'>
				<ALT body='Kliknij, aby wrócić do sklepu' to='/' />
			</div>
		</div>
	);
};

export default OrderComplete;
