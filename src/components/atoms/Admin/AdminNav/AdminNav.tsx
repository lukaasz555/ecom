import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
	return (
		<nav className='text-m'>
			<ul className='flex lg:flex-col gap-y-2 gap-x-5'>
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
			</ul>
		</nav>
	);
};

export default AdminNav;
