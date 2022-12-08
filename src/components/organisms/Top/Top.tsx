import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from '../../atoms/DesktopMenu/DesktopMenu';
import MobileMenu from '../../atoms/MobileMenu/MobileMenu';
import Socials from '../../molecules/Socials/Socials';
import Cart from '../../../assets/logos/cart.svg';

const Top = () => {
	return (
		<div className='flex justify-between items-center min-h-[120px] min-w-s px-5 lg:px-0 relative'>
			<DesktopMenu />
			<MobileMenu />
			<div className='basis-[40%] self-center flex justify-center '>
				<h1 className='font-semibold text-xl text-center font-poppins '>
					Ecommerce Store
				</h1>
			</div>
			<div className='flex items-center'>
				<Socials />
				<Link to={`/#`}>
					<img src={Cart} alt='' />
				</Link>
			</div>
		</div>
	);
};

export default Top;
