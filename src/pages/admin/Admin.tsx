import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../components/atoms/AdminNav/AdminNav';

const Admin = () => {
	const [isAdmin, setAdmin] = useState(false);
	const [error, setError] = useState(false);

	const valid = (password: string) => {
		if (password === 'Test123') {
			setAdmin(true);
			setError(false);
		} else {
			setError(true);
		}
	};

	return (
		<div className='flex flex-col items-center bg-gray min-h-screen'>
			<div className='w-full flex justify-center bg-white border-b-[1px] border-[#C7C7C7] px-2 lg:px-0'>
				<header className='w-full max-w-[900px] bg-white py-3'>
					<h1 className='font-medium text-2xl font-montserrat'>
						<Link to={`/admin`}>someStore - admin panel</Link>
					</h1>
				</header>
			</div>
			<main className='w-full max-w-[900px] my-10 px-2 lg:px-0 grid grid-cols-[200px_1fr]'>
				<aside className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px]'>
					<AdminNav />
				</aside>
				<div className='bg-sparkle'>div</div>
			</main>
		</div>
	);
};

export default Admin;