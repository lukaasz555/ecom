import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailSection from '../../components/molecules/EmailSection/EmailSection';
const Checkout = () => {
	return (
		<div className='flex flex-col items-center bg-gray min-h-screen'>
			<div className='w-full flex justify-center bg-white border-b-[1px] border-[#C7C7C7]'>
				<header className='w-full max-w-[900px] bg-white py-3'>
					<h1 className='font-medium text-2xl font-montserrat'>
						<Link to={`/`}>someStore</Link>
					</h1>
				</header>
			</div>
			<main className='flex flex-col lg:flex-row lg:justify-between w-full max-w-[900px] mt-10'>
				<div className='lg:basis-[48%]'>
					<EmailSection />
				</div>
				<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] lg:basis-[48%] '>
					<h2 className='text-xl font-[400] font-lato'>Twoje zamówienie</h2>
				</div>
			</main>
		</div>
	);
};

export default Checkout;
