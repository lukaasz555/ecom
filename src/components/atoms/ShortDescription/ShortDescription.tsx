import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ProductModel2 } from '../../../models/Product';
import { scrollToRef } from '../../../helpers/scrollToRef';
import CTA from '../CTA/CTA';

interface ShortDescProps extends ProductModel2 {
	myRef: React.MutableRefObject<any>;
}

const ShortDescription: FC<ShortDescProps> = ({ data, myRef }) => {
	const { label, releaseYear, pages, authors, publisher } = data;

	const handleClick = (ref: React.MutableRefObject<null>): void => {
		scrollToRef(ref.current);
	};

	return (
		<div className='hidden md:flex md:flex-col mt-8'>
			{label ? (
				<div className='flex'>
					<span className='text-sparkle font-light mr-2'>Wytwórnia:</span>
					<p className='font-medium'>{label}</p>
				</div>
			) : (
				<div className='flex'>
					<span className='text-sparkle font-light mr-2'>Wydawnictwo:</span>
					<p className='font-medium'>{publisher}</p>
				</div>
			)}

			<div className='flex'>
				<span className='text-sparkle font-light mr-2'>Rok wydania:</span>
				<p className='font-medium'>{releaseYear}</p>
			</div>

			{pages ? (
				<div className='flex'>
					<span className='text-sparkle font-light mr-2'>Liczba stron:</span>
					<p className='font-medium'>{pages}</p>
				</div>
			) : null}
			<div className='flex'>
				<span className='text-sparkle font-light mr-2'>Autor:</span>
				<p className='font-medium'>{authors}</p>
			</div>
			<div className='flex mt-3'>
				<button
					onClick={() => handleClick(myRef)}
					className='font-light flex items-center'>
					Zobacz szczegóły
					<FontAwesomeIcon icon={faChevronDown} className='text-xs ml-[1px]' />
				</button>
			</div>
			<div className='hidden md:block lg:hidden mt-10'>
				<CTA body='do koszyka' />
			</div>
		</div>
	);
};

export default ShortDescription;
