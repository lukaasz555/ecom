import React from 'react';
import { NavLink } from 'react-router-dom';

const DesktopMenu = () => {
	const activeLink =
		'border-b-[1px] border-solid border-black mr-3 font-poppins last:mr-0';
	const defaultLink = 'border-none mr-3 font-poppins last:mr-0 text-sparkle';

	return (
		<nav className='hidden md:block'>
			<NavLink
				to={`/shop/books`}
				className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
				Książki
			</NavLink>
			<NavLink
				to={`/shop/music`}
				className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
				Płyty
			</NavLink>
			<NavLink
				to={`/#`}
				className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
				Kontakt
			</NavLink>
		</nav>
	);
};

export default DesktopMenu;
