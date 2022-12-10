import React, { FC } from 'react';

type PriceProps = {
	price: number;
	discount: number;
	atProductPage: boolean;
};

const Price: FC<PriceProps> = ({ atProductPage, price, discount }) => {
	return (
		<div className='text-left'>
			<h4
				className={`text-l text-sparkle font-light ${
					atProductPage ? 'flex flex-col-reverse' : 'block'
				}`}>
				<span
					className={`${
						atProductPage ? 'text-xl' : 'text-l'
					} text-black font-semibold`}>
					{(price - discount).toFixed(2).replace('.', ',')}
				</span>
				{discount > 0 ? (
					<del className={`${atProductPage ? 'ml-0' : 'ml-2'}`}>
						{price.toString().replace('.', ',')}
					</del>
				) : null}
			</h4>
		</div>
	);
};

export default Price;
