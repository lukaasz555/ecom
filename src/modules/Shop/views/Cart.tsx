import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/templates/Layout/Layout';
import CartItem from '../components/organisms/CartItem/CartItem';
import EmptyCart from '../components/atoms/EmptyCart/EmptyCart';
import CTA from '../../../components/shared/CTA/CTA';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { clearCart } from '../../../features/cart/cartSlice';
import { productsValue } from '../../../helpers/productsValue';

const Cart = () => {
	const cartItems = useAppSelector((state) => state.cartReducer.items);
	const uniqueItems = useAppSelector((state) => state.cartReducer.uniqueItems);
	const isUserLoggedIn = useAppSelector(
		(state) => state.userReducer.isUserLoggedIn
	);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const itemsCost: number = productsValue(cartItems);
	const deliveryCost: number = itemsCost >= 99 ? 0 : 9.9;
	const total: number = itemsCost + deliveryCost;

	const handleClick = () => {
		if (isUserLoggedIn) {
			navigate('/checkout');
		} else {
			navigate('/login');
		}
	};

	const handleClear = () => {
		dispatch(clearCart());
	};

	return (
		<Layout>
			<div className='lg:px-10 py-10 flex justify-center'>
				{cartItems.length > 0 ? (
					<div
						className='w-full max-w-[900px] flex flex-col  
					 items-center lg:items-end'>
						<div className='mb-10'>
							<button
								className='hover:underline text-pencil'
								onClick={handleClear}>
								Wyczyść koszyk
							</button>
						</div>
						<div className='flex flex-col w-full'>
							{uniqueItems.map((item) => (
								<CartItem data={item} key={item.id} cartItems={cartItems} />
							))}
						</div>
						<div className='text-center lg:text-right font-lato font-light'>
							<p>
								Wartość produktów: {handleNumbFormat(productsValue(cartItems))}
								zł
							</p>

							<p>Koszt wysyłki: {handleNumbFormat(deliveryCost)}zł</p>

							<p className='my-3 font-[500] text-l'>
								Całkowita wartość zamówienia: {handleNumbFormat(total)}zł
							</p>
						</div>
						<div>
							<CTA body='dalej' onClick={handleClick} />
						</div>
					</div>
				) : (
					<EmptyCart />
				)}
			</div>
		</Layout>
	);
};

export default Cart;
