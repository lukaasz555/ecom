import React, { FC } from 'react';
import CTA from '../../atoms/CTA/CTA';
import Price from '../../atoms/Price/Price';
import ProductAside from '../ProductAside/ProductAside';
import { ProductModel2 } from '../../../models/Product';
import ShortDescription from '../../atoms/ShortDescription/ShortDescription';

interface PHeadProps extends ProductModel2 {
	myRef: React.MutableRefObject<any>;
}

const ProductHead: FC<PHeadProps> = ({ data, myRef }) => {
	const { id, img, title, authors, discount, price } = data;

	return (
		<div className='md:flex justify-between w-full'>
			<div className='md:flex md:gap-x-5'>
				<div className='flex justify-center md:justify-start md:h-[500px] md:min-w-[300px]'>
					<img src={img} alt={title} className='object-cover' />
				</div>
				<div className='text-center md:text-left font-lato md:min-w-[340px] md:max-w-[400px]'>
					<h2 className='text-2xl mt-5 md:mt-0'>{title}</h2>
					<h3 className='text-xl mt-1 text-sparkle mb-5 lg:mb-14'>{authors}</h3>
					<ShortDescription myRef={myRef} data={data} />
				</div>

				<div className='flex flex-col items-center md:hidden'>
					<Price discount={discount} price={price} atProductPage={true} />
					<div className='mt-5'>
						<CTA body='dodaj do koszyka' />
					</div>
				</div>
			</div>

			<ProductAside discount={discount} price={price} />
		</div>
	);
};

export default ProductHead;
