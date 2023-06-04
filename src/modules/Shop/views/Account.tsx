import React, { useEffect } from 'react';
import Layout from '../components/templates/Layout/Layout';
import { useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { userLogout } from '../../../features/auth/authSlice';
import { fetchUserOrders } from '../../../services/orders.service';
import { Route, Routes } from 'react-router-dom';
import Settings from '../components/organisms/Settings/Settings';
import OrdersHistory from '../components/organisms/OrdersHistory/OrdersHistory';

interface AccountProps {
	children?: React.ReactNode;
}

const Account = ({ children }: AccountProps) => {
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
			<div className='flex items-start'>
				<aside className='flex flex-col items-start gap-y-2 border-r-[1px] border-lightGray py-2 w-[200px]'>
					<button
						className='hover:underline'
						onClick={() => navigate('settings')}>
						Moje dane
					</button>
					<button
						className='hover:underline'
						onClick={() => navigate('my-orders')}>
						Historia zakupów
					</button>
					<button
						className='hover:underline'
						onClick={() => {
							dispatch(userLogout());
							navigate('/');
						}}>
						Wyloguj
					</button>
				</aside>
				<section className='flex flex-col w-[100%]'>
					<Routes>
						<Route path='my-orders' element={<OrdersHistory />} />
						<Route path='settings' element={<Settings />} />
					</Routes>
				</section>
			</div>
		</Layout>
	);
};

export default Account;
