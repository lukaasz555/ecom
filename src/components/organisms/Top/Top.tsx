import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from '../../molecules/DesktopMenu/DesktopMenu';
import MobileMenu from '../../molecules/MobileMenu/MobileMenu';
import Socials from '../../atoms/Socials/Socials';
import Cart from '../../atoms/Cart/Cart';

const Top = () => {
	return (
		<div className='mb-10 mt-2 md:mt-5 lg:mt-10 flex justify-between items-center min-h-[120px] min-w-s px-5 relative'>
			<DesktopMenu />
			<MobileMenu />
			<div className='flex justify-center '>
				<h1 className='font-semibold text-2xl text-center font-montserrat '>
					<Link to={`/`}>someStore</Link>
				</h1>
			</div>
			<div className='flex items-center'>
				<div className='hidden md:block'>
					<Socials />
				</div>
				<Cart />
			</div>
		</div>
	);
};

export default Top;
