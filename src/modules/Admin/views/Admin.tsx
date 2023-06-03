import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import { useAppSelector } from '../../../hooks/hooks';
import { UserRolesEnum } from '../../../enums/UserRolesEnum';

const Admin = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.role !== UserRolesEnum.Admin) {
			navigate('/');
		}
	}, [user]);

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
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
