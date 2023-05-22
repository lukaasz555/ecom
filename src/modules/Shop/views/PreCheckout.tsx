import React from 'react';
import CheckoutLayout from '../components/templates/CheckoutLayout/CheckoutLayout';
import { useNavigate } from 'react-router-dom';

const PreCheckout = () => {
	const navigate = useNavigate();

	return (
		<CheckoutLayout>
			<div className='flex flex-col items-center bg-white px-4 py-5 border-altBorder border-[1px]'>
				<div className='mb-12'>pre-checkout page</div>
				<div className='flex justify-between gap-24'>
					<div>login form?</div>
					<button onClick={() => navigate('/register')}>rejestracja</button>
				</div>
				<div className='mt-6'>
					<button onClick={() => navigate('/checkout')}>
						zakup bez zakładania konta
					</button>
				</div>
				<button className='mt-10 self-start' onClick={() => navigate(-1)}>
					powrót?
				</button>
			</div>
		</CheckoutLayout>
	);
};

export default PreCheckout;
