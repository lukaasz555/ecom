import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from '../../atoms/DesktopMenu/DesktopMenu';
import MobileMenu from '../../atoms/MobileMenu/MobileMenu';
import Socials from '../../atoms/Socials/Socials';
import Cart from '../../atoms/Cart/Cart';

const Top = () => {
	return (
		<div className='flex justify-between items-center min-h-[120px] min-w-s px-5 lg:px-2 relative'>
			<DesktopMenu />
			<MobileMenu />
			<div className='basis-[40%] self-center flex justify-center '>
				<h1 className='font-semibold text-xl text-center font-poppins '>
					<Link to={`/`}>Ecommerce Store</Link>
				</h1>
			</div>
			<div className='flex items-center justify-between'>
				<div className='hidden md:block'>
					<Socials />
				</div>
				<Cart />
			</div>
		</div>
	);
};

export default Top;
