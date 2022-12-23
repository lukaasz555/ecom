import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
	return (
		<nav className='text-m'>
			<ul className='flex flex-col gap-y-2'>
				<li>
					<NavLink
						end
						to={`/admin`}
						className={({ isActive }) =>
							isActive ? 'translate-x-2 block font-semibold' : 'hover:underline'
						}>
						Start
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/admin/orders`}
						className={({ isActive }) =>
							isActive ? 'translate-x-2 block font-semibold' : 'hover:underline'
						}>
						Zamówienia
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/admin/customers`}
						className={({ isActive }) =>
							isActive ? 'translate-x-2 block font-semibold' : 'hover:underline'
						}>
						Klienci
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/admin/products`}
						className={({ isActive }) =>
							isActive ? 'translate-x-2 block font-semibold' : 'hover:underline'
						}>
						Produkty
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default AdminNav;
