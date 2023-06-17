import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DesktopMenu from '../../molecules/DesktopMenu/DesktopMenu';
import MobileMenu from '../../molecules/MobileMenu/MobileMenu';
import Socials from '../../atoms/Socials/Socials';
import CartIcon from '../../atoms/CartIcon/CartIcon';
import UserIcon from '../../../../../assets/icons/user.svg';
import { useAppSelector } from '../../../../../hooks/hooks';
import AccountMenu from '../../molecules/AccountMenu/AccountMenu';

const Top = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const navigate = useNavigate();
	const [isAccMenuOpen, setAccMenuOpen] = useState(false);
	const accMenuRef = useRef<HTMLDivElement | null>(null);

	function userIconClick(): void {
		if (user) {
			setAccMenuOpen(true);
		} else {
			navigate('/account');
		}
	}

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			const target = e.target as Element;
			if (!accMenuRef.current?.contains(target)) {
				setAccMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	});

	return (
		<div className='mb-10 mt-2 md:mt-5 lg:mt-10 flex justify-between items-center min-h-[120px] min-w-s px-5 relative'>
			<DesktopMenu />
			<MobileMenu />
			<AccountMenu
				ref={accMenuRef}
				isOpen={isAccMenuOpen}
				setAccMenuOpen={setAccMenuOpen}
			/>
			<div>
				<h1 className='font-medium text-2xl'>
					<Link to={`/`}>someStore</Link>
				</h1>
			</div>
			<div className='flex items-center ml-auto'>
				<div className='hidden md:block mr-7'>
					<Socials />
				</div>
				<CartIcon />
				<button onClick={userIconClick} className='ml-3 hidden md:block'>
					<img src={UserIcon} alt='account' />
				</button>
			</div>
		</div>
	);
};

export default Top;
