import React from 'react';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import CurrentSales from '../../../modules/Admin/components/CurrentSales/CurrentSales';

const Sales = () => {
	return (
		<AdminLayout>
			<div>
				<h2 className='text-2xl'>
					Sprzedaż <span className='text-lightBlack'>(in progress)</span>{' '}
				</h2>
				<CurrentSales />
			</div>
		</AdminLayout>
	);
};

export default Sales;
