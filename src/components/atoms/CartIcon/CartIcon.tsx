import React from 'react';
import { Link } from 'react-router-dom';
import CartIconSVG from '../../../assets/icons/cart.svg';
import { useAppSelector } from '../../../hooks/hooks';

const CartIcon = () => {
	const items = useAppSelector((state) => state.cart.items);

	return (
		<div className='pl-2 ml-1 border-none md:border-l-[1px] md:border-solid md:border-grey'>
			<Link to={`/cart`} className='flex'>
				<img src={CartIconSVG} alt='Koszyk' />
				<p className='ml-1 text-xl font-light font-montserrat'>
					{items.length}
				</p>
			</Link>
		</div>
	);
};

export default CartIcon;
