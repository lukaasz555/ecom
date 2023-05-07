import React from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import CurrentSales from '../../molecules/CurrentSales/CurrentSales';

const Sales = () => {
	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>
					Sprzedaż <span className='text-lightBlack'>(in progress)</span>{' '}
				</h2>
				<CurrentSales />
			</div>
		</AdminLayout>
	);
};

export default Sales;
