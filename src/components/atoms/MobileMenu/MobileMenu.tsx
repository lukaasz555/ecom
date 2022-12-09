import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Socials from '../Socials/Socials';

const MobileMenu = () => {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className='md:hidden flex flex-col'>
			<button onClick={() => setOpen(!isOpen)}>CLC</button>
			<nav
				className={`${
					isOpen ? '-translate-x-[50%]' : '-translate-x-[150%]'
				} absolute -bottom-[150%] left-[50%] flex flex-col z-20 w-full items-center justify-center bg-fab py-8 duration-300 origin-left`}>
				<NavLink to={`/#`} className='text-2xl'>
					Książki
				</NavLink>
				<NavLink to={`/#`} className='text-2xl'>
					Płyty
				</NavLink>
				<NavLink to={`/#`} className='text-2xl'>
					Kontakt
				</NavLink>
				<Socials />
			</nav>
		</div>
	);
};

export default MobileMenu;
