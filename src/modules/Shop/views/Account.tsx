import React, { useEffect } from 'react';
import Layout from '../components/templates/Layout/Layout';
import { useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { userLogout } from '../../../features/auth/authSlice';
import { fetchUserOrders } from '../../../services/orders.service';

const Account = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (user) {
			fetchUserOrders(user.id);
		}
	}, [user]);

	return (
		<Layout>
			<div className='flex flex-col items-center'>
				<div className='flex justify-center'>/account</div>
				<button className='mt-4' onClick={() => dispatch(userLogout())}>
					logout
				</button>
			</div>
		</Layout>
	);
};

export default Account;
