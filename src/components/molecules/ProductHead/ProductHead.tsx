import React, { FC } from 'react';
import CTA from '../../atoms/CTA/CTA';
import Price from '../../atoms/Price/Price';

type ProductHeadProps = {
	img: string;
	title: string;
	authors: string[];
	price: number;
	discount: number;
};

const ProductHead: FC<ProductHeadProps> = ({
	title,
	authors,
	img,
	price,
	discount,
}) => {
	return (
		<>
			<div>
				<img src={img} alt={title} />
			</div>
			<div className='text-center'>
				<h2 className='text-2xl mt-5'>{title}</h2>
				<h3 className='text-xl mt-1 text-sparkle'>{authors}</h3>
			</div>

			<div>
				<Price discount={discount} price={price} atProductPage={true} />
				<CTA body='dodaj do koszyka' />
			</div>
		</>
	);
};

export default ProductHead;
