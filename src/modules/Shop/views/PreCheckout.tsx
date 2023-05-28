import React from 'react';
import CheckoutLayout from '../components/templates/CheckoutLayout/CheckoutLayout';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/molecules/LoginForm/LoginForm';
import { userLogout } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

const PreCheckout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const handleClick = () => {
		dispatch(userLogout());
	};

	return (
		<CheckoutLayout>
			<div className='flex flex-col items-center bg-white px-4 py-5 border-altBorder border-[1px]'>
				{/* just temporary */}
				<button onClick={handleClick}>logout</button>
				<LoginForm />
			</div>
		</CheckoutLayout>
	);
};

export default PreCheckout;
