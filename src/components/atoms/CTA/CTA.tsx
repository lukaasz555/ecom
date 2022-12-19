import React, { FC } from 'react';

interface CTAProps {
	body: string;
	onClick?: (e: React.MouseEvent) => void;
}

const CTA: FC<CTAProps> = ({ body, onClick }) => {
	return (
		<button
			className='px-5 py-3 bg-black font-light text-white text-m uppercase hover:bg-sparkle duration-150 min-w-[200px]'
			onClick={onClick}>
			{body}
		</button>
	);
};

export default CTA;
