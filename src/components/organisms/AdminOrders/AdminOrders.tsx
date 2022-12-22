import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderModel } from '../../../models/Order';

const AdminOrders = () => {
	const [orders, setOrders] = useState<OrderModel[] | []>([]);

	useEffect(() => {
		const getOrders = async () => {
			const res = await axios
				.get('http://localhost:1337/orders/all')
				.then((res) => setOrders(res.data))
				.catch((err) => console.log(err));
		};

		getOrders();
		console.log(orders);
	}, []);

	return (
		<div className=''>
			{orders.length > 0 ? (
				orders.map((order) => (
					<div key={order.orderId}>
						<div>Numer: {order.orderId}</div>
						<div>
							Kody produktów:{' '}
							{
								new Set(
									order.order.cart.items.map((order) => order.id).join(', ')
								)
							}
						</div>
						<div>Ilość produktów: {order.order.cart.items.length}</div>
						<div>Cena: {order.order.value}</div>
					</div>
				))
			) : (
				<p>Brak zamówień.</p>
			)}
		</div>
	);
};

export default AdminOrders;
