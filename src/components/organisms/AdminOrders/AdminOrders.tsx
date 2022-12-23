import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';

const AdminOrders = () => {
	const [orders, setOrders] = useState<OrderModel[] | []>([]);

	useEffect(() => {
		const getOrders = async () => {
			const res = await axios
				.get('http://localhost:1337/orders/')
				.then((res) => setOrders(res.data))
				.catch((err) => console.log(err));
		};
		getOrders();
	}, []);

	return (
		<AdminLayout>
			<div>
				<h2 className='text-2xl'>Zamówienia</h2>
			</div>
			<div className='my-3 bg-green'>panel zamówień...</div>
			<div className=''>
				<div className='flex w-full border-b-[1px]'>
					<div className='basis-[15%] border-r-[1px] text-center pb-1'>
						numer
					</div>
					<div className='basis-[45%] border-r-[1px] text-center pb-1'>
						dane klienta
					</div>
					<div className='basis-[15%] border-r-[1px] text-center pb-1'>
						kwota
					</div>
					<div className='basis-[25%] text-center pb-1'>data</div>
				</div>
				{orders.length > 0 ? (
					orders.map((order) => (
						<div key={order.orderId} className='flex w-full border-b-[1px]'>
							<div className='basis-[15%] border-r-[1px] text-center pb-1'>
								{order.orderId}
							</div>
							<div className='basis-[45%] border-r-[1px] text-center pb-1'>
								<p>
									{order.customer.customerData.name}{' '}
									{order.customer.customerData.lastname}
								</p>
							</div>
							<div className='basis-[15%] border-r-[1px] text-center pb-1'>
								{order.order.value} zł
							</div>
							<div className='basis-[25%] text-center pb-1'>data</div>
						</div>
					))
				) : (
					<p>Brak zamówień.</p>
				)}
			</div>
		</AdminLayout>
	);
};

export default AdminOrders;
