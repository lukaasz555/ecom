import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { handleCategoryNames } from '../../../helpers/handleCategoryNames';

interface ICategoryButton {
	to: string;
	cat: number;
}

const CategoryButton: FC<ICategoryButton> = ({ to, cat }) => {
	return (
		<div className='xl:border-r-[1px] border-sparkle px-0 last:border-none'>
			{cat === 99 ? (
				<Link
					to={to}
					className='text-m font-medium text-brownSugar px-4 focus:outline outline-2 outline-lightBlack outline-offset-0 active:outline-black'>
					{handleCategoryNames(cat)?.toUpperCase()}
				</Link>
			) : (
				<Link
					to={to}
					className='text-m font-light text-sparkle hover:text-black px-4 inline-block focus:outline outline-2 outline-lightBlack outline-offset-0 active:outline-black'>
					{handleCategoryNames(cat)?.toUpperCase()}
				</Link>
			)}
		</div>
	);
};

export default CategoryButton;
