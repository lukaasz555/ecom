import React, { FC } from 'react';
import { ProductModel } from '../../../models/Product';

type PDetailsProps = {
	product: ProductModel;
};

const ProductDetails: FC<PDetailsProps> = ({ product }) => {
	return (
		<div className='mt-10  w-full'>
			<h3 className='uppercase text-xl border-b-[1px] mb-3'>szczegóły</h3>
			<ul className=''>
				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Kod produktu:</span>
					<p className='basis-1/2'>{product.id}</p>
				</li>
				<li className='flex justify-between items-center py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Tytuł:</span>
					<p className='basis-1/2'>{product.title}</p>
				</li>
				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Autor:</span>
					<p className='basis-1/2'>{product.authors}</p>
				</li>
				{product.publisher !== '' ? (
					<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
						<span className='text-sparkle basis-1/2'>Wydawnictwo:</span>
						<p className='basis-1/2'>{product.publisher}</p>
					</li>
				) : null}

				{product.language !== '' ? (
					<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
						<span className='text-sparkle basis-1/2'>Język wydania:</span>
						<p className='basis-1/2'>{product.language}</p>
					</li>
				) : null}

				{product.pages ? (
					<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
						<span className='text-sparkle basis-1/2'>Liczba stron:</span>
						<p className='basis-1/2'>{product.pages}</p>
					</li>
				) : null}

				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Rok wydania:</span>
					<p className='basis-1/2'>{product.releaseYear}</p>
				</li>

				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Kategoria:</span>
					<p className='basis-1/2'>{product.category}</p>
				</li>
			</ul>
		</div>
	);
};

export default ProductDetails;
