import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';
import { UserRolesEnum } from '../../../../../enums/UserRolesEnum';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { userLogout } from '../../../../../features/auth/authSlice';

const AccountNav = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	return (
		<aside className='flex justify-around lg:flex-col lg:items-start lg:gap-y-2 lg:border-r-[1px] border-lightGray py-2 lg:w-[200px] border-b-[1px] lg:border-b-0'>
			<button
				className='lg:w-[180px] flex justify-center lg:justify-start hover:underline'
				onClick={() => navigate('settings')}>
				Moje dane
			</button>
			<button
				className='lg:w-[180px] flex justify-center lg:justify-start hover:underline'
				onClick={() => navigate('my-orders')}>
				Historia zakupów
			</button>
			{user?.role === UserRolesEnum.Admin ? (
				<button
					className='lg:w-[180px] flex justify-center lg:justify-start hover:underline'
					onClick={() => navigate('/admin')}>
					Panel administratora
				</button>
			) : null}

			<button
				className='lg:w-[180px] flex justify-center lg:justify-start hover:underline'
				onClick={() => {
					dispatch(userLogout());
					navigate('/');
				}}>
				Wyloguj
			</button>
		</aside>
	);
};

export default AccountNav;
