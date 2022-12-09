import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Socials from '../../atoms/Socials/Socials';
import { Fade as Hamburger } from 'hamburger-react';
import MobileMenuLink from '../../atoms/MobileMenuLink/MobileMenuLink';

const MobileMenu = () => {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className='md:hidden flex flex-col'>
			<button onClick={() => setOpen(!isOpen)}>
				<Hamburger color='#4A5859' direction='right' duration={0.6} size={24} />
			</button>
			<nav
				className={`${
					isOpen ? '-translate-x-[50%]' : '-translate-x-[150%]'
				} absolute -bottom-[250%] left-[50%] flex flex-col z-20 w-full items-center bg-white justify-center py-8 duration-300 origin-left`}>
				<MobileMenuLink to='/#' body='Książki' />
				<MobileMenuLink to='/#' body='Płyty' />
				<MobileMenuLink to='/#' body='Kontakt' />
				<div className='border-t-[1px] mt-5'>
					<Socials />
				</div>
			</nav>
		</div>
	);
};

export default MobileMenu;
