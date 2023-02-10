import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import OrderItem from '../../atoms/Admin/OrderItem/OrderItem';
import Loader from '../../atoms/Loader/Loader';
import ReactPaginate from 'react-paginate';
import AdminOrderTemplate from '../../atoms/AdminOrderTemplate/AdminOrderTemplate';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';

const AdminOrders = () => {
	const [allOrders, setAllOrders] = useState<OrderModel[] | []>([]);
	const [orders, setOrders] = useState<OrderModel[] | []>([]);
	const [filtered, setFiltered] = useState<OrderModel[] | []>([]);
	const [priceFilter, setPriceFilter] = useState(false);
	const [dateFilter, setDateFilter] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const URL = process.env.REACT_APP_SERVER_URL;
	const [error, setError] = useState(false);
	// pagination
	const [ordersOffset, setOrdersOffset] = useState(0);
	const ordersPerPage = 10;
	const endOffset = ordersOffset + ordersPerPage;
	const currentOrders = orders.slice(ordersOffset, endOffset);
	const pageCount = Math.ceil(orders.length / ordersPerPage);

	const handlePageClick = (e: any) => {
		const newOffset = (e.selected * ordersPerPage) % orders.length;
		setOrdersOffset(newOffset);
	};

	useEffect(() => {
		setOrders(filtered);
	}, [filtered]);

	useEffect(() => {
		setError(false);
		const getOrders = async () => {
			await axios
				.get(`${URL}/orders`)
				.then((res) => {
					setOrders(res.data);
					setAllOrders(res.data);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					setError(true);
				});
		};
		getOrders();
	}, []);

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
					<div className='min-h-[340px]'>
						<AdminOrderTemplate
							setPriceFilter={setPriceFilter}
							priceFilter={priceFilter}
							dateFilter={dateFilter}
							setDateFilter={setDateFilter}
							orders={orders}
							setFiltered={setFiltered}
						/>
						{currentOrders.map((order) => (
							<OrderItem order={order} key={order._id} />
						))}
					</div>

					<div className='flex justify-center mt-3'>
						<ReactPaginate
							className='flex gap-x-5'
							pageCount={pageCount}
							onPageChange={handlePageClick}
							nextLabel='kolejna>>'
							previousLabel='<<poprzednia'
							activeLinkClassName='text-white bg-black px-1.5 text-center py-0.5 rounded-[4px]'
							disabledClassName='opacity-0'
							disabledLinkClassName='cursor-default'
						/>
					</div>
				</div>
			) : orders.length === 0 && !error ? (
				<p className='mt-10'>Brak zamówień.</p>
			) : (
				<ErrorMessage
					text1='Brak połączenia'
					text2='Odśwież stronę i spróbuj ponownie'
				/>
			)}
		</AdminLayout>
	);
};

export default AdminOrders;
