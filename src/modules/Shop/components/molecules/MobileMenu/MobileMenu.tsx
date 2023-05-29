import React, { useState } from 'react';
import Socials from '../../atoms/Socials/Socials';
import { Fade as Hamburger } from 'hamburger-react';
import MobileMenuLink from '../../atoms/MobileMenuLink/MobileMenuLink';
import { userLogout } from '../../../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../../../hooks/hooks';
import clsx from 'clsx';

const MobileMenu = () => {
	const [isOpen, setOpen] = useState(false);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const user = useAppSelector((state) => state.userReducer.user);

	return (
		<div className='mr-auto md:hidden flex flex-col'>
			<button onClick={() => setOpen(!isOpen)}>
				<Hamburger color='#4A5859' direction='right' duration={0.6} size={24} />
			</button>
			<nav
				className={clsx(
					isOpen ? '-translate-x-[50%]' : '-translate-x-[150%]',
					'absolute left-[50%] flex flex-col z-20 w-full items-center bg-white justify-center py-8 duration-300 origin-left shadow-lg',
					user ? '-bottom-[300%]' : '-bottom-[200%]'
				)}>
				<MobileMenuLink to='/shop/products/books/99' body='Książki' />
				<MobileMenuLink to='/shop/products/albums/99' body='Płyty' />
				<MobileMenuLink to='/contact' body='Kontakt' />
				{user ? (
					<div className='flex flex-col'>
						<MobileMenuLink to='/account' body='Moje konto' />
						<button
							className='text-l my-2 py-1 font-lato font-light'
							onClick={() => dispatch(userLogout())}>
							Wyloguj
						</button>
					</div>
				) : null}
				<div className='border-t-[1px] mt-5 pt-5'>
					<Socials />
				</div>
			</nav>
		</div>
	);
};

export default MobileMenu;
