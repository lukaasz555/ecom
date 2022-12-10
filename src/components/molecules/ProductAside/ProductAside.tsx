import React, { FC } from 'react';
import Price from '../../atoms/Price/Price';
import CTA from '../../atoms/CTA/CTA';
import ALT from '../../atoms/ALT/ALT';
import { Link } from 'react-router-dom';

type PAsideProps = {
	discount: number;
	price: number;
};

const ProductAside: FC<PAsideProps> = ({ discount, price }) => {
	return (
		<aside className='hidden md:flex flex-col items-center max-w-[300px] bg-gray self-end px-8 py-5'>
			<div className='mb-10 text-center'>
				<h5 className='text-brownSugar font-medium text-xl'>Trwa wyprzedaż!</h5>
				<Link to='/#' className='hover:underline'>
					Zobacz przecenione produkty
				</Link>
			</div>
			<div className='border-b-[1px] pb-5 mb-5 text-center'>
				<p className='font-montserrat'>Darmowa dostawa od 99pln</p>
				<p className='text-green text-montserrat'>Wysyłamy w ciągu 48h</p>
			</div>
			<div className='hidden md:flex flex-col items-center pb-5 mb-5 '>
				<div className='mb-2'>
					<Price discount={discount} price={price} atProductPage={true} />
				</div>
				<CTA body='do koszyka' />
			</div>
			<div className='flex flex-col items-center'>
				<h5 className='mb-4 text-center'>Potrzebujesz pomocy z zamówieniem?</h5>
				<ALT to='/contact' body='kontakt' />
			</div>
		</aside>
	);
};

export default ProductAside;
