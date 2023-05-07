import React, { forwardRef } from 'react';
import Price from '../../molecules/Price/Price';
import ProductAside from '../../molecules/ProductAside/ProductAside';
import { ProductModel } from '../../../models/Product';
import ShortDescription from '../../atoms/ShortDescription/ShortDescription';
import AddToCartBtn from '../../atoms/AddToCartBtn/AddToCartBtn';

interface ProductHeadProps {
	data: ProductModel;
	openModal: () => void;
}

const ProductHead = forwardRef<
	React.MutableRefObject<HTMLDivElement>,
	ProductHeadProps
>(({ data, openModal }, ref) => {
	const { img, title, authors, discount, price, type } = data;

	return (
		<div className='md:flex justify-between w-full'>
			<div
				className={`md:flex md:gap-x-5 ${
					type === 'books' ? 'md:gap-x-8' : 'md:gap-x-0'
				}`}>
				<div
					className={`flex justify-center md:justify-start ${
						type === 'books' ? 'h-[360px]' : 'md:h-[340px] md:w-[390px]'
					}`}>
					<img
						src={img}
						alt={title}
						className='object-cover cursor-pointer'
						onClick={openModal}
					/>
				</div>
				<div className='text-center md:text-left font-lato md:min-w-[340px] md:max-w-[400px]'>
					<h2 className='text-2xl mt-5 md:mt-0'>{title}</h2>
					<h3 className='text-xl mt-1 text-sparkle mb-5 lg:mb-14'>
						{authors.join(', ')}
					</h3>
					<ShortDescription ref={ref} data={data} />
				</div>

				<div className='flex flex-col items-center md:hidden gap-y-3'>
					<Price discount={discount} price={price} atProductPage={true} />
					{price > 0 ? <AddToCartBtn body='do koszyka' data={data} /> : null}
				</div>
			</div>

			<ProductAside data={data} />
		</div>
	);
});

export default ProductHead;
