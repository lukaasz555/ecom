import React from 'react';
import { NavLink } from 'react-router-dom';

const DesktopMenu = () => {
	const activeLink =
		'border-b-[1px] border-solid border-black font-lato pb-1 mr-3 last:mr-0 font-light';
	const defaultLink =
		'border-none mr-3 font-lato last:mr-0 pb-1 text-sparkle font-light';

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
