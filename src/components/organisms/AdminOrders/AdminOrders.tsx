import React, { useEffect, useState } from 'react';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import OrderItem from '../../atoms/Admin/OrderItem/OrderItem';
import Loader from '../../atoms/Loader/Loader';
import ReactPaginate from 'react-paginate';
import AdminOrderTemplate from '../../atoms/AdminOrderTemplate/AdminOrderTemplate';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
//
import { useDispatch } from 'react-redux';
import { loadData } from '../../../features/admin/ordersSlice';
import { fetchOrders } from '../../../features/admin/ordersSlice';
import { useAppSelector } from '../../../hooks/hooks';

const AdminOrders = () => {
	// const [allOrders, setAllOrders] = useState<OrderModel[] | []>([]);
	// const [orders, setOrders] = useState<OrderModel[] | []>([]);
	const orders = useAppSelector((state) => state.ordersReducer.orders);
	const [filtered, setFiltered] = useState<OrderModel[] | []>([]);
	const [priceFilter, setPriceFilter] = useState(false);
	const [dateFilter, setDateFilter] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	// pagination
	const [ordersOffset, setOrdersOffset] = useState(0);

	// const endOffset = ordersOffset + ordersPerPage;
	// const currentOrders = orders.slice(ordersOffset, endOffset);
	// const pageCount = Math.ceil(orders.length / ordersPerPage);
	const ordersPerPage: number = 5;
	const [currentPage, setCurrentPage] = useState<number>(1);
	// let currentPage = 1;
	const [pageCount, setPageCount] = useState<number>(0);
	const dispatch = useDispatch();

	const handlePageClick = (e: any) => {
		const newOffset = (e.selected * ordersPerPage) % orders.length;
		setOrdersOffset(newOffset);
	};

	// useEffect(() => {
	// 	setOrders(filtered);
	// }, [filtered]);

	const getOrdersFromStore = async () => {
		const { orders, totalPages } = await fetchOrders({
			limit: ordersPerPage,
			page: currentPage,
		});
		dispatch(loadData(orders));
		setPageCount(totalPages);
	};

	function handlePageChange(): void {
		setCurrentPage(currentPage + 1);
		// setCurrentPage(currentPage + 1);
		// console.log(currentPage);
		getOrdersFromStore();
	}

	useEffect(() => {
		setError(false);
		getOrdersFromStore()
			.then(() => setLoading(false))
			.catch((err) => {
				setLoading(false);
				setError(true);
			});
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

						{orders.map((order) => (
							<OrderItem order={order} key={order._id} />
						))}
					</div>
					<div className='flex flex-col'>
						<p>
							Obecna strona: <strong>{currentPage}</strong>
						</p>
						<p>
							Strony: <strong>{pageCount}</strong>{' '}
						</p>
					</div>
					<div className='flex justify-center mt-3'>
						{/* <ReactPaginate
							className='flex gap-x-5'
							pageCount={pageCount}
							onPageChange={handlePageClick}
							nextLabel='kolejna>>'
							previousLabel='<<poprzednia'
							activeLinkClassName='text-white bg-black px-1.5 text-center py-0.5 rounded-[4px]'
							disabledClassName='opacity-0'
							disabledLinkClassName='cursor-default'
						/> */}

						<button onClick={handlePageChange}>next page</button>
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
