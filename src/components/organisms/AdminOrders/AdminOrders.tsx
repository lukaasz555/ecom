import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import OrderItem from '../../atoms/Admin/OrderItem/OrderItem';

const AdminOrders = () => {
	const [allOrders, setAllOrders] = useState<OrderModel[] | []>([]);
	const [orders, setOrders] = useState<OrderModel[] | []>([]);
	const [filtered, setFiltered] = useState<OrderModel[] | []>([]);

	useEffect(() => {
		const getOrders = async () => {
			const res = await axios
				.get('http://localhost:1337/orders/')
				.then((res) => {
					console.log(res.data);
					setOrders(res.data);
					setAllOrders(res.data);
				})
				.catch((err) => console.log(err));
		};
		getOrders();
	}, []);

	useEffect(() => {
		setOrders(filtered);
	}, [filtered]);

	const priceSort = () => {
		const filtered = orders.sort((a, b) => a.order.value - b.order.value);
		return filtered;
	};

	const sortByPrice = () => {
		const sorted = priceSort();
		setFiltered(sorted);
	};

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Zamówienia</h2>
			</div>
			{orders.length > 0 ? (
				<div className='w-full'>
					<div className='flex w-full justify-start border-b-[1px] text-center'>
						<div className='basis-[20%] min-w-[80px] border-r-[1px] py-1'>
							<p>STATUS</p>
						</div>
						<div className='basis-[50%] min-w-[120px] border-r-[1px] py-1'>
							<p>DANE KLIENTA</p>
						</div>
						<div className='basis-[15%] min-w-[80px] border-r-[1px] py-1'>
							<button onClick={sortByPrice} className='px-2'>
								<p>KWOTA</p>
							</button>
						</div>
						<div className='basis-[15%] text-center py-1'>DATA</div>
					</div>
					{orders.map((order) => (
						<OrderItem order={order} />
					))}
				</div>
			) : (
				<p>Brak zamówień.</p>
			)}
		</AdminLayout>
	);
};

export default AdminOrders;
