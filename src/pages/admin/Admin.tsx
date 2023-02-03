import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/templates/AdminLayout/AdminLayout';

const Admin = () => {
	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Admin panel - start</h2>
			</div>
			<div className='flex gap-x-1'>
				<Link to={`/admin/orders`} className='hover:underline text-sparkle'>
					zamówienia
				</Link>
				<p>- dane/szczegóły dotyczące zamówienia oraz klienta,</p>
			</div>
			<div className='flex gap-x-1'>
				<Link to={`/admin/products`} className='hover:underline text-sparkle'>
					produkty
				</Link>
				<p>- baza produktów (dodaj, usuń, edytuj),</p>
			</div>
			<div className='flex gap-x-1'>
				<Link to={`/admin/sales`} className='hover:underline text-sparkle'>
					sprzedaż
				</Link>
				<p>- dane dotyczące sprzedaży,</p>
			</div>
		</AdminLayout>
	);
};

export default Admin;
