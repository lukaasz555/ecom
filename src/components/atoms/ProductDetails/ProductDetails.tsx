import { ProductModel2 } from '../../../models/Product';
import { handleCategoryNames } from '../../../helpers/handleCategoryNames';
import { Link } from 'react-router-dom';

const ProductDetails = ({ data }: ProductModel2) => {
	return (
		<div id='details' className='mt-10  w-full'>
			<h3 className='uppercase text-xl border-b-[1px] mb-3 font-lato font-light pb-2'>
				szczegóły
			</h3>
			<ul>
				<li className='flex justify-start items-center py-1 odd:bg-white even:bg-gray font-lato px-2'>
					<span className='text-sparkle basis-1/3'>Kod produktu:</span>
					<p className='basis-2/3'>{data.id}</p>
				</li>
				<li className='flex justify-start items-center py-1 odd:bg-white even:bg-gray font-lato px-2'>
					<span className='text-sparkle basis-1/3'>Tytuł:</span>
					<p className='basis-2/3'>{data.title}</p>
				</li>
				<li className='flex justify-start items-center  py-1 odd:bg-white even:bg-gray font-lato px-2'>
					<span className='text-sparkle basis-1/3'>Autor:</span>
					<p className='basis-2/3'>{data.authors.join(`, `)}</p>
				</li>
				{data.publisher ? (
					<li className='flex justify-start items-center  py-1 odd:bg-white even:bg-gray font-lato px-2'>
						<span className='text-sparkle basis-1/3'>Wydawnictwo:</span>
						<p className='basis-2/3'>{data.publisher}</p>
					</li>
				) : (
					<li className='flex justify-start items-center  py-1 odd:bg-white even:bg-gray font-lato px-2'>
						<span className='text-sparkle basis-1/3'>Wytwórnia:</span>
						<p className='basis-2/3'>{data.label}</p>
					</li>
				)}

				{data.language ? (
					<li className='flex justify-start items-center  py-1 odd:bg-white even:bg-gray font-lato px-2'>
						<span className='text-sparkle basis-1/3'>Język wydania:</span>
						<p className='basis-2/3'>{data.language}</p>
					</li>
				) : null}

				{data.pages ? (
					<li className='flex justify-start items-center  py-1 odd:bg-white even:bg-gray font-lato px-2'>
						<span className='text-sparkle basis-1/3'>Liczba stron:</span>
						<p className='basis-2/3'>{data.pages}</p>
					</li>
				) : null}

				<li className='flex justify-start items-center  py-1 odd:bg-white even:bg-gray font-lato px-2'>
					<span className='text-sparkle basis-1/3'>Rok wydania:</span>
					<p className='basis-2/3'>{data.releaseYear}</p>
				</li>

				<li className='flex justify-start items-center py-1 odd:bg-white even:bg-gray font-lato px-2'>
					<span className='text-sparkle basis-1/3'>Kategoria:</span>
					<Link
						to={`/shop/category/${data.type}/${data.categoryID}`}
						className='text-sapphire'>
						{handleCategoryNames(data.categoryID)}
					</Link>
				</li>
				<li className='flex justify-start items-center px-2 py-1 odd:bg-white even:bg-gray text-m font-lato'>
					<span className='text-sparkle basis-1/3'>Format:</span>
					<p className='basis-2/3'>{data.format}</p>
				</li>
			</ul>
		</div>
	);
};

export default ProductDetails;
