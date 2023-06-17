import React from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../../../../features/auth/authSlice';
import clsx from 'clsx';

type AccountMenuProps = {
	isOpen: boolean;
	setAccMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountMenu = React.forwardRef<HTMLDivElement, AccountMenuProps>(
	({ isOpen, setAccMenuOpen }, ref) => {
		const navigate = useNavigate();
		const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

		function handleClick(location: string): void {
			navigate(`/account/${location}`);
			setAccMenuOpen(false);
		}

		function handleLogout(): void {
			dispatch(userLogout()).then(() => {
				navigate('/');
				setAccMenuOpen(false);
			});
		}

		return (
			<div
				ref={ref}
				className={clsx(
					'absolute right-0 -bottom-[100%] px-8 py-4 z-20 bg-white shadow-lg rounded-lg hidden md:flex flex-col items-start gap-y-1 w-[180px]',
					isOpen
						? 'opacity-1 visible translate-y-0 duration-200'
						: 'opacity-0 invisible -translate-y-[30px] duration-200'
				)}>
				<div className='text-sparkle hover:text-black border-b-[1px] border-lightBlack w-[100%] pb-1 mb-2'>
					<button onClick={() => handleClick('settings')}>Konto</button>
				</div>

				<div className='text-sparkle  hover:text-black border-b-[1px] border-lightBlack w-[100%] pb-1 mb-2'>
					<button onClick={() => handleClick('my-orders')}>Zakupy</button>
				</div>
				<div className='text-sparkle hover:text-black border-b-[1px] border-lightBlack w-[100%] pb-1 mb-2'>
					<button onClick={() => handleLogout()}>Wyloguj</button>
				</div>
			</div>
		);
	}
);
export default AccountMenu;
