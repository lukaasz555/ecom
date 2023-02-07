import React, { useEffect, useState } from 'react';
import AdminLayout from '../../templates/AdminLayout/AdminLayout';
import axios from 'axios';
import Loader from '../../atoms/Loader/Loader';
import { OrderModel } from '../../../models/Order';
import { ProductModel } from '../../../models/Product';
import moment from 'moment';
import { handleMonthName } from '../../../helpers/handleMonthName';
import { getOrdersByMonth } from '../../../helpers/getOrdersByMonth';
import { getTypesQty } from '../../../helpers/getTypesQty';

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

	const productsIDs = allOrders
		.map((obj) => obj.order.items.map((item) => item.id))
		.flat();

	const uniqueIDs = Array.from(new Set(productsIDs.map((p) => p)));

	const getNameOfProduct: (id: string) => string | null = (id: string) => {
		const currentProduct = products.find((p) => p.id === id);
		if (currentProduct) return currentProduct.title;
		return null;
	};

	const getTypeOfProduct: (id: string) => string = (id: string) => {
		const currentProduct = products.find((p) => p.id === id);
		if (currentProduct) return currentProduct.type;
		return '';
	};

	const checkIdFreq = (arr: string[], id: string) => {
		return {
			item: id,
			title: getNameOfProduct(id),
			type: getTypeOfProduct(id),
			qty: arr.filter((item) => item.toLowerCase() === id.toLowerCase()).length,
		};
	};

	const getMostSoldItems = () => {
		const record: {
			item: string;
			title: string | null;
			type: string;
			qty: number;
		}[] = [];
		uniqueIDs.map((item) => record.push(checkIdFreq(productsIDs, item)));
		return record.sort((a, b) => Number(b.qty) - Number(a.qty));
	};

	// getting data necessary to use in the chart:
	const monthsOfOrders = Array.from(
		new Set(allOrders.map((item) => moment(item.createdAt).format('M')))
	);

	const getMonthData = (item: string) => {
		const ordersArray = getOrdersByMonth(allOrders, item);
		const obj = {
			name: handleMonthName(item),
			orders: ordersArray,
			books: getTypesQty(ordersArray, 'books'),
			albums: getTypesQty(ordersArray, 'albums'),
		};
		return obj;
	};

	//console.log(getMonthData(monthsOfOrders[2]));

	const chartData = monthsOfOrders.map((item) => getMonthData(item));

	return (
		<AdminLayout>
			<div className='min-w-[550px]'>
				<h2 className='text-2xl'>Sprzedaż</h2>
				{isLoading ? (
					<div className='w-full flex justify-center my-10'>
						<Loader />
					</div>
				) : (
					getMostSoldItems()
						.slice(0, 10)
						.map(({ item, title, qty }) => (
							<div key={item}>
								<p>
									{title && title} : {qty}
								</p>
							</div>
						))
				)}
			</div>
		</AdminLayout>
	);
};

export default Sales;
