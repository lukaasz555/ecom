import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
	return (
		<div className='flex flex-col items-center mt-10'>
			<h3 className='text-2xl font-lato mb-7'>Koszyk</h3>
			<p className='mb-1'>Twój koszyk jest pusty.</p>
			<Link to={`/shop`} className='group uppercase flex mt-2'>
				rozpocznij zakupy
				<svg
					className='ml-2 group-hover:translate-x-1 duration-200 rotate-180'
					width='22'
					height='22'
					xmlns='http://www.w3.org/2000/svg'
					fillRule='evenodd'
					clipRule='evenodd'>
					<path d='M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z' />
				</svg>
			</Link>
		</div>
	);
};

export default EmptyCart;
