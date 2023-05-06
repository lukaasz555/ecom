import React from 'react';
import clsx from 'clsx';

interface CTAProps {
	body: string;
	onClick?: (e: React.MouseEvent) => void;
	disabled?: boolean;
	id?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

const CTA = ({ body, onClick, disabled, id, type }: CTAProps) => {
	return (
		<button
			className={clsx(
				'px-5 py-3 bg-black font-light text-white text-m uppercase hover:bg-sparkle duration-150 min-w-[200px] w-full',
				'disabled:bg-lightBlack disabled:cursor-not-allowed'
			)}
			onClick={onClick}
			disabled={disabled}
			id={id}
			type={type}>
			{body}
		</button>
	);
};

export default CTA;
