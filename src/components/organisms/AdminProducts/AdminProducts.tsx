import React from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import AddProduct from '../../molecules/AddProduct/AddProduct';

const AdminProducts = () => {
	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Produkty</h2>
			</div>
			<p>products at store</p>
			<AddProduct />
		</AdminLayout>
	);
};

export default AdminProducts;
