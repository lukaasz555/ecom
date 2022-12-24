import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import axios from 'axios';
import { CustomerModel } from '../../../models/Customer';

const AdminCustomers = () => {
	const [customers, setCustomers] = useState<CustomerModel[] | []>([]);
	const [singleCustomer, setSingleCustomer] = useState<CustomerModel | null>(
		null
	);
	const [open, setOpen] = useState(false);

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
		setOpen(!open);
	};

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Klienci</h2>
			</div>
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
			<div className={`${open ? 'block' : 'hidden'}`}>
				{singleCustomer ? (
					<div>
						<p>id: {singleCustomer.customerId}</p>
						<p>Dane: {singleCustomer.customerName}</p>
						<p>Liczba zamówień: {singleCustomer.orders.length}</p>
						<p>E-mail: {singleCustomer.customerEmail}</p>
						<p>
							Newsletter: {singleCustomer.newsletterConsent ? 'Tak' : 'Nie'}
						</p>
					</div>
				) : null}
			</div>
		</AdminLayout>
	);
};

export default AdminCustomers;
