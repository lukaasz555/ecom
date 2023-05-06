import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from '../../molecules/DesktopMenu/DesktopMenu';
import MobileMenu from '../../molecules/MobileMenu/MobileMenu';
import Socials from '../../atoms/Socials/Socials';
import CartIcon from '../../atoms/CartIcon/CartIcon';

const Top = () => {
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
			</div>
		</div>
	);
};

export default Top;
