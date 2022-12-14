import React, { FC } from 'react';

interface CTAProps {
	body: string;
	onClick?: (e: React.MouseEvent) => void;
	disabled?: boolean;
	id?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

const CTA: FC<CTAProps> = ({ body, onClick, disabled, id, type }) => {
	return (
		<button
			className='px-5 py-3 bg-black font-light text-white text-m uppercase hover:bg-sparkle duration-150 min-w-[200px] w-full
			outline-black'
			onClick={onClick}
			disabled={disabled}
			id={id}
			type={type}>
			{body}
		</button>
	);
};

export default CTA;
