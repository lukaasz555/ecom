import React, { FC } from 'react';
import NotAvailable from '../../atoms/NotAvailable/NotAvailable';

type PriceProps = {
	price: number;
	discount: number;
	atProductPage: boolean;
};

const Price: FC<PriceProps> = ({ atProductPage, price, discount }) => {
	return (
		<div className='text-center'>
			{price > 0 ? (
				<h4
					className={`text-l text-sparkle font-light ${
						atProductPage ? 'flex flex-col-reverse' : 'block'
					}`}>
					<span
						className={`${
							atProductPage ? 'text-2xl' : 'text-m'
						} text-black font-lato font-semibold`}>
						{(price - discount).toFixed(2).replace('.', ',')}zł
					</span>
					{discount > 0 ? (
						<del
							className={`
						font-lato font-[400]
						${atProductPage ? 'ml-0 text-xl' : 'ml-2 text-m'} `}>
							{price.toFixed(2).toString().replace('.', ',')}zł
						</del>
					) : null}
				</h4>
			) : (
				<NotAvailable atProductPage={atProductPage} />
			)}
		</div>
	);
};

export default Price;
