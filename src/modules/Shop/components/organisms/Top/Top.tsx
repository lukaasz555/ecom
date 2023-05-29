import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DesktopMenu from '../../molecules/DesktopMenu/DesktopMenu';
import MobileMenu from '../../molecules/MobileMenu/MobileMenu';
import Socials from '../../atoms/Socials/Socials';
import CartIcon from '../../atoms/CartIcon/CartIcon';
import UserIcon from '../../../../../assets/icons/user.svg';
import { useAppSelector } from '../../../../../hooks/hooks';

const Top = () => {
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.userReducer.user);

	return (
		<div className='mb-10 mt-2 md:mt-5 lg:mt-10 flex justify-between items-center min-h-[120px] min-w-s px-5 relative'>
			<DesktopMenu />
			<MobileMenu />
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
				{user ? (
					<button
						onClick={() => navigate('/account')}
						className='ml-3 hidden md:block'>
						<img src={UserIcon} alt='account' />
					</button>
				) : null}
			</div>
		</div>
	);
};

export default Top;
