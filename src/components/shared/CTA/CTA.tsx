import React from 'react';
import clsx from 'clsx';
import Loader from '../Loader/Loader';

interface CTAProps {
	body: string;
	onClick?: (e: React.MouseEvent) => void;
	disabled?: boolean;
	id?: string;
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	size?: 'large' | 'medium' | 'small';
	dark?: boolean;
}

const CTA = ({
	body,
	onClick,
	disabled,
	id,
	type,
	isLoading,
	size,
	dark,
}: CTAProps) => {
	return (
		<button
			className={clsx(
				'px-5 py-3 bg-black font-light text-white text-m uppercase hover:bg-sparkle duration-150 min-w-[200px] w-full h-[50px]',
				'disabled:bg-lightBlack disabled:cursor-not-allowed'
			)}
			onClick={onClick}
			disabled={disabled}
			id={id}
			type={type}>
			{isLoading ? (
				<div className='flex justify-center'>
					<Loader size={size} dark={false} />
				</div>
			) : (
				body
			)}
		</button>
	);
};

export default CTA;
