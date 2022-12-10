import React, { FC, useEffect, useRef, useState } from 'react';
import CTA from '../../atoms/CTA/CTA';
import Price from '../../atoms/Price/Price';
import ProductAside from '../ProductAside/ProductAside';
import { ProductModel2 } from '../../../models/Product';
import { Link } from 'react-router-dom';
import { scrollToRef } from '../../../helpers/scrollToRef';

interface PHeadProps extends ProductModel2 {
	myRef: React.MutableRefObject<any>;
}

const ProductHead: FC<PHeadProps> = ({ data, myRef }) => {
	const { id, img, title, authors, discount, price } = data;

	const handleClick = (ref: React.MutableRefObject<null>): void => {
		scrollToRef(ref.current);
	};

	return (
		<div className=' md:flex  md:gap-x-5'>
			<div className='flex justify-center md:justify-start md:h-[460px]'>
				<img src={img} alt={title} className='object-cover' />
			</div>
			<div className='text-center md:text-left md:basis-1/4 font-lato md:min-w-[200px]'>
				<h2 className='text-2xl mt-5 md:mt-0'>{title}</h2>
				<h3 className='text-xl mt-1 text-sparkle'>{authors}</h3>
				<div className='hidden md:flex md:flex-col mt-8'>
					<div className='flex'>
						<span className='text-sparkle font-light mr-2'>Liczba stron:</span>
						<p className='font-medium'>999</p>
					</div>
					<div className='flex'>
						<span className='text-sparkle font-light mr-2'>Wydawnictwo:</span>
						<p className='font-medium'>999</p>
					</div>
					<button onClick={() => handleClick(myRef)}>szczegoły?</button>
				</div>
			</div>

			<div className='flex flex-col items-center md:hidden'>
				<Price discount={discount} price={price} atProductPage={true} />
				<div className='mt-5'>
					<CTA body='dodaj do koszyka' />
				</div>
			</div>

			<ProductAside discount={discount} price={price} />
		</div>
	);
};

export default ProductHead;
