import React, { FC } from 'react';
import Price from '../../atoms/Price/Price';
import ProductAside from '../ProductAside/ProductAside';
import { ProductModel2 } from '../../../models/Product';
import ShortDescription from '../../atoms/ShortDescription/ShortDescription';

interface PHeadProps extends ProductModel2 {
	myRef: React.MutableRefObject<any>;
}

const ProductHead: FC<PHeadProps> = ({ data, myRef }) => {
	const { img, title, authors, discount, price, type } = data;

	return (
		<div className='md:flex justify-between w-full'>
			<div
				className={`md:flex md:gap-x-5 ${
					type === 'books' ? 'md:gap-x-5' : 'md:gap-x-0'
				}`}>
				<div
					className={`flex justify-center md:justify-start ${
						type === 'books'
							? 'md:h-[500px] md:min-w[300px]'
							: 'md:h-[360px] md:w-[400px]'
					}`}>
					<img src={img} alt={title} className='object-cover' />
				</div>
				<div className='text-center md:text-left font-lato md:min-w-[340px] md:max-w-[400px]'>
					<h2 className='text-2xl mt-5 md:mt-0'>{title}</h2>
					<h3 className='text-xl mt-1 text-sparkle mb-5 lg:mb-14'>
						{[...authors].join(', ')}
					</h3>
					<ShortDescription myRef={myRef} data={data} />
				</div>

				<div className='flex flex-col items-center md:hidden'>
					<Price discount={discount} price={price} atProductPage={true} />
				</div>
			</div>

			<ProductAside discount={discount} price={price} type={type} />
		</div>
	);
};

export default ProductHead;
