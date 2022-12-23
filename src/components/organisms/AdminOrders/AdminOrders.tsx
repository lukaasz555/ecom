import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
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
			<div>
				<h2 className='text-2xl'>Zamówienia</h2>
			</div>
			{orders.length > 0 ? (
				<div>
					<div className='flex w-full border-b-[1px]'>
						<div className='basis-[15%] border-r-[1px] text-center pb-1'>
							numer
						</div>
						<div className='basis-[45%] border-r-[1px] text-center pb-1'>
							dane klienta
						</div>
						<div className='basis-[15%] border-r-[1px] text-center pb-1'>
							<button onClick={sortByPrice}>kwota</button>
						</div>
						<div className='basis-[25%] text-center pb-1'>data</div>
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
