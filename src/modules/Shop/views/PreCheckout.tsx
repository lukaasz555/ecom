import React from 'react';
import CheckoutLayout from '../components/templates/CheckoutLayout/CheckoutLayout';
import LoginForm from '../components/molecules/LoginForm/LoginForm';
import { userLogout } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

const PreCheckout = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const handleClick = () => {
		dispatch(userLogout());
	};

	return (
		<CheckoutLayout>
			<div className='flex flex-col items-center bg-white px-4 py-5 border-altBorder border-[1px]'>
				<h2 className='uppercase text-xl font-lato mb-6'>logowanie</h2>
				<LoginForm />
				{/* just temporary */}
				<button onClick={handleClick}>logout</button>
			</div>
		</CheckoutLayout>
	);
};

export default PreCheckout;
