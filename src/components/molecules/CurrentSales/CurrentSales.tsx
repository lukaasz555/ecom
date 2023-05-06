import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';
import { useEffect, useState } from 'react';
import Loader from '../../atoms/Loader/Loader';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import { fetchOrdersForChart } from '../../../services/orders.service';

type ChartData = {
	name: string;
	orders: number;
	ordersValue: number;
	// books: number;
	// albums: number;
};

const CurrentSales = () => {
	const [data, setData] = useState<ChartData[] | []>([]);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isError, setError] = useState<boolean>(false);

	const fetchOrders = async () => {
		const res = await fetchOrdersForChart();
		setData(res);
	};

	useEffect(() => {
		fetchOrders()
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className='w-full flex flex-col items-center mt-10 pb-10 border-b-[1px] border-lightGray'>
			{isLoading ? (
				<Loader />
			) : !isError ? (
				<>
					<h3 className='mb-5'>Podsumowanie dotychczasowej sprzedaży:</h3>
					<AreaChart
						width={400}
						height={380}
						data={data}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						{/*
				<Area
					type='monotone'
					dataKey='albums'
					stackId='2'
					stroke='#8884d8'
					fill='#8884d8'
				/>
				 <Area
					type='monotone'
					dataKey='books'
					stackId='2'
					stroke='#82ca9d'
					fill='#82ca9d'
				/>
				*/}
						<Area
							type={'monotone'}
							dataKey='ordersValue'
							stackId='2'
							stroke='#fab'
						/>
						<Area
							type='monotone'
							dataKey='orders'
							stackId='1'
							stroke='#ffc658'
							fill='#ffc658'
						/>
					</AreaChart>
				</>
			) : (
				<ErrorMessage text1='Błąd pobierania danych' />
			)}
		</div>
	);
};

export default CurrentSales;
