import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import axios from 'axios';
import Loader from '../../atoms/Loader/Loader';
import { OrderModel } from '../../../models/Order';
import { ProductModel } from '../../../models/Product';
import CurrentSales from '../../molecules/CurrentSales/CurrentSales';
import TopProducts from '../../molecules/TopProducts/TopProducts';

const Sales = () => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const URL = process.env.REACT_APP_SERVER_URL;
	const [allOrders, setAllOrders] = useState<OrderModel[]>([]);
	const [products, setProducts] = useState<ProductModel[]>([]);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${URL}/orders`)
			.then((res) => {
				setAllOrders(res.data);
				setLoading(false);
				setError(false);
			})
			.catch((err) => {
				setLoading(false);
				setError(true);
			});

		axios
			.get(`${URL}/products`)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				setError(true);
			});
	}, []);

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>
					Sprzedaż <span className='text-lightBlack'>(in progress)</span>{' '}
				</h2>
				{isLoading ? (
					<div className='w-full flex justify-center my-10'>
						<Loader />
					</div>
				) : (
					<>
						<CurrentSales allOrders={allOrders} />
						<TopProducts allOrders={allOrders} products={products} />
					</>
				)}
			</div>
		</AdminLayout>
	);
};

export default Sales;
