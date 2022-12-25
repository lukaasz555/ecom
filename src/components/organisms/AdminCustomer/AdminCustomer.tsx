import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import { CustomerModel } from '../../../models/Customer';
import { OrderModel } from '../../../models/Customer';
import axios from 'axios';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';

const AdminCustomer = () => {
	const [customer, setCustomer] = useState<CustomerModel | null>(null);
	const [orders, setOrders] = useState<OrderModel[] | []>([]);
	const location = useLocation();
	const address = location.pathname;
	const id = address.substring(address.length - 3);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const params = {
			customerId: id,
		};
		const getCustomerData = async () => {
			const res = await axios
				.get(`http://localhost:1337/customers/${id}`, { params })
				.then((res) => {
					setCustomer(res.data);
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		};
		getCustomerData();
	}, []);

	const getCustomerOrders = async () => {
		setOpen(!open);
	};

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Klient imię nazwisko (id)</h2>
			</div>
			<div>
				{customer !== null ? (
					<div>
						<p>
							id: <span className='font-[500]'>{customer.customerId}</span>
						</p>
						<p>
							Dane: <span className='font-[500]'>{customer.customerName}</span>
						</p>

						<p>
							Zamówienia:{' '}
							<button id={id} onClick={() => getCustomerOrders()}>
								<span className='font-[500]'>{customer.orders.length}</span>
							</button>
						</p>
						<p>
							E-mail:{' '}
							<span className='font-[500]'>{customer.customerEmail}</span>{' '}
						</p>
						<p>
							Newsletter:{' '}
							<span className='font-[500]'>
								{customer.newsletterConsent ? 'Tak' : 'Nie'}
							</span>
						</p>
					</div>
				) : null}
			</div>
			{customer !== null && (
				<div className={`${open ? 'block' : 'hidden'}`}>
					{customer.orders.length > 0 ? (
						<div className='flex flex-col'>
							{customer.orders.map((o) => (
								<div className='flex gap-x-2'>
									<p>Kwota: </p>
									<p>{handleNumbFormat(o.value)} zł</p>
								</div>
							))}
						</div>
					) : null}
				</div>
			)}
		</AdminLayout>
	);
};

export default AdminCustomer;
