import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderModel } from '../../../models/Order';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import OrderItem from '../../atoms/Admin/OrderItem/OrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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

	/* 	const priceSort = () => {
		const filtered = orders.sort((a, b) => a.order.value - b.order.value);
		return filtered;
	};

	const sortByPrice = () => {
		const sorted = priceSort();
		setFiltered(sorted);
	}; */

	const [priceFilter, setPriceFilter] = useState(false);

	const sortByPrice = (type: string) => {
		if (type === 'grow') {
			setFiltered(orders.sort((a, b) => a.order.value - b.order.value));
		}

		if (type === 'decrease') {
			setFiltered(orders.sort((a, b) => b.order.value - a.order.value));
		}
		setPriceFilter(!priceFilter);
	};

	useEffect(() => {
		setOrders(filtered);
	}, [filtered]);

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
							<button
								onClick={() => setPriceFilter(!priceFilter)}
								className='px-2'>
								<p>KWOTA</p>
							</button>
							<ul
								className={`${priceFilter ? 'flex flex-col' : 'hidden'} px-2`}>
								<li className='text-xs text-left mt-1'>
									<button onClick={() => sortByPrice('grow')}>
										<FontAwesomeIcon icon={faChevronUp} /> rosnąco
									</button>
								</li>

								<li className='text-xs text-left mt-1'>
									<button onClick={() => sortByPrice('decrease')}>
										<FontAwesomeIcon icon={faChevronDown} /> malejąco
									</button>
								</li>
							</ul>
						</div>
						<div className='basis-[15%] text-center py-1'>DATA</div>
					</div>
					{orders.map((order) => (
						<OrderItem order={order} key={order._id} />
					))}
				</div>
			) : (
				<p>Brak zamówień.</p>
			)}
		</AdminLayout>
	);
};

export default AdminOrders;
