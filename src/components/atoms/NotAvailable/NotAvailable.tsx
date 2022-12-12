import React from 'react';

type NotAvailableProps = {
	atProductPage?: boolean;
};

const NotAvailable = ({ atProductPage }: NotAvailableProps) => {
	return (
		<>
			{atProductPage ? (
				<button
					disabled={true}
					className='border-[1px] border-pencil text-pencil border-solid px-5 py-3 text-[13px] min-w-[200px]'>
					Produkt niedostępny
				</button>
			) : (
				<span className='text-pencil text-[16px] font-lato text-[13px]'>
					Produkt niedostępny
				</span>
			)}
		</>
	);
};

export default NotAvailable;
