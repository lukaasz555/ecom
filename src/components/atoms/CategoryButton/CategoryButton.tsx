import React, { FC } from 'react';

interface ICategoryButton {
	cat: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CategoryButton: FC<ICategoryButton> = ({ cat, onClick }) => {
	return (
		<button
			onClick={(e) => onClick(e)}
			key={cat}
			id={cat}
			className='xl:border-r-[1px] border-sparkle px-0 last:border-none '>
			{cat.toLowerCase() === 'sale' ? (
				<p className='text-[16px] font-medium text-brownSugar px-4'>
					{cat.toUpperCase()}
				</p>
			) : (
				<p className='text-[16px] font-light text-sparkle hover:text-black px-4 inline-block'>
					{cat.toUpperCase()}
				</p>
			)}
		</button>
	);
};

export default CategoryButton;
