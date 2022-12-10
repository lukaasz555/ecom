import { ProductModel2 } from '../../../models/Product';
import { scrollToRef } from '../../../helpers/scrollToRef';

const ProductDetails = ({ data }: ProductModel2) => {
	return (
		<div id='details' className='mt-10  w-full'>
			<h3 className='uppercase text-xl border-b-[1px] mb-3'>szczegóły</h3>
			<ul className=''>
				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Kod produktu:</span>
					<p className='basis-1/2'>{data.id}</p>
				</li>
				<li className='flex justify-between items-center py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Tytuł:</span>
					<p className='basis-1/2'>{data.title}</p>
				</li>
				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Autor:</span>
					<p className='basis-1/2'>{data.authors}</p>
				</li>
				{data.publisher !== '' ? (
					<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
						<span className='text-sparkle basis-1/2'>Wydawnictwo:</span>
						<p className='basis-1/2'>{data.publisher}</p>
					</li>
				) : null}

				{data.language !== '' ? (
					<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
						<span className='text-sparkle basis-1/2'>Język wydania:</span>
						<p className='basis-1/2'>{data.language}</p>
					</li>
				) : null}

				{data.pages ? (
					<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
						<span className='text-sparkle basis-1/2'>Liczba stron:</span>
						<p className='basis-1/2'>{data.pages}</p>
					</li>
				) : null}

				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Rok wydania:</span>
					<p className='basis-1/2'>{data.releaseYear}</p>
				</li>

				<li className='flex justify-between items-center  py-1 odd:bg-white even:bg-gray'>
					<span className='text-sparkle basis-1/2'>Kategoria:</span>
					<p className='basis-1/2'>{data.category}</p>
				</li>
			</ul>
		</div>
	);
};

export default ProductDetails;
