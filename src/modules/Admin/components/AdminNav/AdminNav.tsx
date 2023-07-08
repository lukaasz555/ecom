import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { userLogout } from '../../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const navigate = useNavigate();

	return (
		<nav className='text-m'>
			<ul className='flex flex-wrap lg:flex-nowrap lg:flex-col gap-y-5 lg:gap-y-2 gap-x-5'>
				<li>
					<NavLink
						end
						to={`/admin`}
						className={({ isActive }) =>
							isActive ? 'font-semibold' : 'hover:underline'
						}>
						Start
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/admin/orders`}
						className={({ isActive }) =>
							isActive ? 'font-semibold' : 'hover:underline'
						}>
						Zamówienia
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/admin/products`}
						className={({ isActive }) =>
							isActive ? 'font-semibold' : 'hover:underline'
						}>
						Produkty
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/admin/sales`}
						className={({ isActive }) =>
							isActive ? 'font-semibold' : 'hover:underline'
						}>
						Sprzedaż
					</NavLink>
				</li>
				<li>
					<button
						className='hover:underline'
						onClick={() => {
							dispatch(userLogout());
							navigate('/');
						}}>
						Wyloguj
					</button>
				</li>
				<li className='flex items-end'>
					<NavLink to={`/`} className='hover:underline text-xs'>
						powrót do sklepu
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default AdminNav;
