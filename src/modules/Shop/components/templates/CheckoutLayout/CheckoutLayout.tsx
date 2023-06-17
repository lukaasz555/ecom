import React from 'react';
import { Link } from 'react-router-dom';

interface ICheckoutLayout {
	children?: React.ReactNode;
}

const CheckoutLayout = ({ children }: ICheckoutLayout) => {
	return (
		<div className='flex flex-col items-center bg-gray min-h-screen'>
			<div className='w-full flex justify-center bg-white border-b-[1px] border-altBorder px-2 lg:px-0'>
				<header className='w-full max-w-[900px] bg-white py-3'>
					<h1 className='font-medium text-2xl font-montserrat'>
						<Link to={`/`}>someStore</Link>
					</h1>
				</header>
			</div>
			<main className='w-full max-w-[900px] my-10 px-2 py-3'>{children}</main>
		</div>
	);
};

export default CheckoutLayout;
