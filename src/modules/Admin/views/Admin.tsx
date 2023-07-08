import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout/AdminLayout';

const Admin = () => {
	return (
		<AdminLayout>
			<div className='min-w-[320px]'>
				<h2 className='text-2xl'>Admin panel - start</h2>
			</div>
			<div className='flex items-center'>
				<Link
					to={`/admin/orders`}
					className='hover:underline text-sparkle min-w-[120px]'>
					zamówienia
				</Link>
				<p>- dane/szczegóły dotyczące zamówienia oraz klienta,</p>
			</div>
			<div className='flex items-center'>
				<Link
					to={`/admin/products`}
					className='hover:underline text-sparkle min-w-[120px]'>
					produkty
				</Link>
				<p>- baza produktów (dodaj, usuń, edytuj),</p>
			</div>
			<div className='flex items-center'>
				<Link
					to={`/admin/sales`}
					className='hover:underline text-sparkle min-w-[120px]'>
					sprzedaż
				</Link>
				<p>- dane dotyczące sprzedaży,</p>
			</div>
		</AdminLayout>
	);
};

export default Admin;
