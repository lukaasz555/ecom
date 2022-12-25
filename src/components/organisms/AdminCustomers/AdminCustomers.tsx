import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import axios from 'axios';
import { CustomerModel } from '../../../models/Customer';
import { Link } from 'react-router-dom';

const AdminCustomers = () => {
	const [customers, setCustomers] = useState<CustomerModel[] | []>([]);

	useEffect(() => {
		const getCustomers = async () => {
			const res = await axios
				.get('http://localhost:1337/customers/')
				.then((res) => {
					console.log(res.data);
					setCustomers(res.data);
				})
				.catch((err) => console.log(err));
		};
		getCustomers();
	}, []);

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Klienci</h2>
			</div>
			<div>
				{customers.length > 0
					? customers.map(({ customerId, customerName }) => (
							<div key={customerId}>
								<Link to={`/admin/customers/${customerId}`}>
									{customerName}
								</Link>
							</div>
					  ))
					: 'Brak klientów do wyświetlenia'}
			</div>
		</AdminLayout>
	);
};

export default AdminCustomers;
