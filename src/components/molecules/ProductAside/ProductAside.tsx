import React, { FC } from 'react';
import Price from '../Price/Price';
import ALT from '../../atoms/ALT/ALT';
import { Link } from 'react-router-dom';
import AddToCartBtn from '../../atoms/AddToCartBtn/AddToCartBtn';
import { ProductModel } from '../../../models/Product';

type PAsideProps = {
	data: ProductModel;
};

const ProductAside: FC<PAsideProps> = ({ data }) => {
	const { discount, price, type } = data;

	return (
		<aside className='hidden lg:flex flex-col items-center justify-between max-w-[280px] bg-gray px-8 py-5 ml-3'>
			<div className='mb-10 text-center font-lato'>
				<h5 className='text-brownSugar text-l'>Trwa wyprzedaż!</h5>
				<Link
					to={`/shop/category/${type}/99`}
					className='hover:underline text-m font-lato'>
					Zobacz przecenione produkty
				</Link>
			</div>
			<div className='border-b-[1px] pb-8 mb-5 text-center text-s'>
				<p>Darmowa dostawa od 99pln</p>
				<p className='text-green'>Wysyłamy w ciągu 48h</p>
			</div>
			<div className='hidden md:flex flex-col items-center mb-5'>
				<div className='mb-2'>
					<Price discount={discount} price={price} atProductPage={true} />
				</div>
				{price > 0 ? <AddToCartBtn body='do koszyka' data={data} /> : null}
			</div>
			<div className='flex flex-col items-center'>
				<h5 className='mb-4 text-center text-s'>
					Potrzebujesz pomocy z zamówieniem?
				</h5>
				<ALT to='/contact' body='kontakt' />
			</div>
		</aside>
	);
};

export default ProductAside;
