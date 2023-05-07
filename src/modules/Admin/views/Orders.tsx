import React, { useEffect, useState } from 'react';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import OrderItem from '../components/OrderItem/OrderItem';
import Loader from '../../../components/shared/Loader/Loader';
import ErrorMessage from '../../../components/shared/ErrorMessage/ErrorMessage';
import { useDispatch } from 'react-redux';
import { loadData } from '../../../features/admin/ordersSlice';
import { fetchOrders } from '../../../services/orders.service';
import { useAppSelector } from '../../../hooks/hooks';
import Pagination from '../../../components/shared/Pagination/Pagination';
import OrderModal from '../components/OrderModal/OrderModal';
import { useSearchParams } from 'react-router-dom';
import { useNavigationSearch } from '../../../hooks/hooks';

const AdminOrders = () => {
	const orders = useAppSelector((state) => state.ordersReducer.orders);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [pageCount, setPageCount] = useState<number>(0);
	const dispatch = useDispatch();
	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedOrder, setSelectedOrder] = useState<OrderModel>();
	const navigationSearch = useNavigationSearch();
	const [searchParams, setSearchParams] = useSearchParams();
	const limit = searchParams.get('ordersPerPage');
	const page = searchParams.get('currentPage');
	const [ordersPerPage, setOrdersPerPage] = useState<number>(Number(limit));
	const [currentPage, setCurrentPage] = useState<number>(Number(page));

	const getOrders = async () => {
		navigationSearch('/admin/orders', {
			ordersPerPage: String(ordersPerPage),
			currentPage: String(currentPage),
		});
		const { items: orders, totalPages } = await fetchOrders({
			limit: ordersPerPage,
			page: currentPage,
		});
		dispatch(loadData(orders));
		setPageCount(totalPages);
	};

	const handleLoading = () => {
		if (Number(page) === 0) {
			setCurrentPage(1);
			setOrdersPerPage(10);
		}
		setLoading(true);
		getOrders()
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		handleLoading();
	}, [ordersPerPage, currentPage]);

	const selectOrder = (id: string) => {
		const order = orders.find((x) => x._id === id);
		setSelectedOrder(order);
		openModal();
	};

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

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
				<div className='min-h-[340px] flex flex-col justify-between'>
					<table className='w-full mb-12'>
						<thead>
							<tr className='border-b-[1px] text-left'>
								<th className='font-medium w-[120px]'>STATUS</th>
								<th className='font-medium w-auto'>DANE KLIENTA</th>
								<th className='font-medium w-[80px] text-center'>KWOTA</th>
								<th className='font-medium w-[100px] text-center'>DATA</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<OrderItem
									selectOrder={selectOrder}
									order={order}
									key={order._id}
								/>
							))}
						</tbody>
					</table>
					<div className='flex justify-center mt-3'>
						<Pagination
							currentPage={currentPage}
							itemsPerPage={ordersPerPage}
							pageCount={pageCount}
							setCurrentPage={setCurrentPage}
							setItemsPerPage={setOrdersPerPage}
							options={[5, 10, 15, 20]}
						/>
					</div>
					<OrderModal
						showModal={isModalOpen}
						closeModal={closeModal}
						order={selectedOrder}
						isModalOpen={isModalOpen}
					/>
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
