import React from 'react';
import { Link } from 'react-router-dom';
import Socials from '../../atoms/Socials/Socials';

const Footer = () => {
	return (
		<div className='mt-20 mb-5 min-w-s w-[90%] max-w-[1200px] flex flex-col items-center border-lightBlack border-t-[1px] mx-auto'>
			<div className='mt-10 flex flex-col items-center'>
				<h1 className='font-medium text-xl font-montserrat'>
					<Link to={`/`} className='block mb-5'>
						someStore
					</Link>
				</h1>
				<Socials />
			</div>
		</div>
	);
};

export default Footer;
