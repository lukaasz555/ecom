import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import OrderItem from '../../atoms/Admin/OrderItem/OrderItem';
import PriceFilter from '../../atoms/Admin/PriceFilter/PriceFilter';
import DateFilter from '../../atoms/Admin/DateFilter/DateFilter';
import Loader from '../../atoms/Loader/Loader';

const AdminOrders = () => {
	const [allOrders, setAllOrders] = useState<OrderModel[] | []>([]);
	const [orders, setOrders] = useState<OrderModel[] | []>([]);
	const [filtered, setFiltered] = useState<OrderModel[] | []>([]);
	const [priceFilter, setPriceFilter] = useState(false);
	const [dateFilter, setDateFilter] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getOrders = async () => {
			const res = await axios
				.get('http://localhost:1337/orders')
				.then((res) => {
					setOrders(res.data);
					setAllOrders(res.data);
					setLoading(false);
				})
				.catch((err) => setLoading(false));
		};
		getOrders();
	}, []);

	const handleSort = (type: string) => {
		if (type === 'grow') {
			setFiltered(orders.sort((a, b) => a.order.value - b.order.value));
			setDateFilter(false);
			setPriceFilter(false);
		}

		if (type === 'decrease') {
			setFiltered(orders.sort((a, b) => b.order.value - a.order.value));
			setDateFilter(false);
			setPriceFilter(false);
		}

		if (type === 'latest') {
			setFiltered(
				orders.sort((a, b) => {
					const date1 = new Date(a.createdAt).getTime();
					const date2 = new Date(b.createdAt).getTime();
					return date1 - date2;
				})
			);
			setDateFilter(false);
			setPriceFilter(false);
		}

		if (type === 'older') {
			setFiltered(
				orders.sort((a, b) => {
					const date1 = new Date(a.createdAt).getTime();
					const date2 = new Date(b.createdAt).getTime();
					return date2 - date1;
				})
			);
			setDateFilter(false);
			setPriceFilter(false);
		}
	};

	useEffect(() => {
		setOrders(filtered);
	}, [filtered]);

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Zamówienia</h2>
			</div>
			{isLoading ? (
				<div className='min-h-[200px] flex justify-center items-center'>
					<Loader />
				</div>
			) : orders.length > 0 ? (
				<div className='w-full'>
					<div className='flex w-full justify-start border-b-[1px] text-center'>
						<div className='basis-[20%] min-w-[80px] border-r-[1px] py-1'>
							<p>STATUS</p>
						</div>
						<div className='basis-[50%] min-w-[120px] border-r-[1px] py-1'>
							<p>DANE KLIENTA</p>
						</div>
						<div className='basis-[15%] min-w-[80px] border-r-[1px] py-1'>
							<button
								onClick={() => setPriceFilter(!priceFilter)}
								className='px-2'>
								<p>KWOTA</p>
							</button>
							<PriceFilter priceFilter={priceFilter} handleSort={handleSort} />
						</div>
						<div className='basis-[15%] text-center py-1'>
							<button
								className='px-2'
								onClick={() => setDateFilter(!dateFilter)}>
								DATA
							</button>
							<DateFilter handleSort={handleSort} dateFilter={dateFilter} />
						</div>
					</div>
					{orders.map((order) => (
						<OrderItem order={order} key={order._id} />
					))}
				</div>
			) : (
				<p className='mt-10'>Brak zamówień.</p>
			)}
		</AdminLayout>
	);
};

export default AdminOrders;
