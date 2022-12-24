import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import axios from 'axios';
import { CustomerModel } from '../../../models/Customer';

const AdminCustomers = () => {
	const [customers, setCustomers] = useState<CustomerModel[] | []>([]);
	const [pickedCustomer, setPickedCustomer] = useState<CustomerModel | null>(
		null
	);
	const [singleCustomer, setSingleCustomer] = useState<CustomerModel | null>(
		null
	);

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

	const getCustomerById = async (id: string) => {
		const params = {
			customerId: id,
		};
		const res = await axios
			.get(`http://localhost:1337/customers/id?=${id}`, { params })
			.then((res) => {
				setSingleCustomer(res.data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Zamówienia</h2>
			</div>
			<p>customers...</p>
			<div>
				{customers.length > 0
					? customers.map((c) => (
							<div key={c.customerId}>
								<button onClick={() => getCustomerById(c.customerId)}>
									{c.customerName}
								</button>
							</div>
					  ))
					: 'Brak klientów do wyświetlenia'}
			</div>
			<div>
				{singleCustomer ? (
					<p>
						{singleCustomer.newsletterConsent
							? 'zgoda na newsletter'
							: 'brak zgody'}{' '}
						- {singleCustomer.customerName}
					</p>
				) : null}
			</div>
		</AdminLayout>
	);
};

export default AdminCustomers;
