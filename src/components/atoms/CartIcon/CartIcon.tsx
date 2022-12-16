import React from 'react';
import { Link } from 'react-router-dom';
import CartIconSVG from '../../../assets/logos/cart.svg';

const CartIcon = () => {
	const qty = 1;

	return (
		<div className='pl-2 ml-1 border-none md:border-l-[1px] md:border-solid md:border-grey'>
			<Link to={`/#`} className='flex'>
				<img src={CartIconSVG} alt='Koszyk' />
				<p className='ml-1 text-xl font-light font-montserrat'>{qty}</p>
			</Link>
		</div>
	);
};

export default CartIcon;
