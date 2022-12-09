import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../../../assets/logos/cart.svg';

const Cart = () => {
	return (
		<div className='pl-2 ml-1 border-none md:border-l-[1px] md:border-solid border-grey'>
			<Link to={`/#`} className='flex'>
				<img src={CartIcon} alt='Koszyk' />
				<p className='ml-1 text-xl font-light'>1</p>
			</Link>
		</div>
	);
};

export default Cart;
