import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';
import { useEffect, useState } from 'react';
import Loader from '../../../../components/shared/Loader/Loader';
import ErrorMessage from '../../../../components/shared/ErrorMessage/ErrorMessage';
import { fetchOrdersForChart } from '../../../../services/orders.service';

export type ChartData = {
	name: string;
	orders: number;
};

const CurrentSales = () => {
	const [chartData, setChartData] = useState<ChartData[] | []>([]);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isError, setError] = useState<boolean>(false);
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	const fetchOrders = async () => {
		const res = await fetchOrdersForChart();
		if (res.data) {
			setChartData(res.data);
		}
	};

	useEffect(() => {
		fetchOrders()
			.catch((e) => setError(true))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className='w-full flex flex-col items-center mt-10 pb-10 min-w-[320px]'>
			{isLoading ? (
				<Loader />
			) : !isError ? (
				<>
					<h3 className='mb-5'>Podsumowanie dotychczasowej sprzedaży:</h3>
					{windowWidth > 610 ? (
						<AreaChart
							width={600}
							height={380}
							data={chartData}
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
							<Area
								type='monotone'
								dataKey='orders'
								stackId='1'
								stroke='#B96D40'
								fill='#b96c4041'
							/>
						</AreaChart>
					) : (
						<ErrorMessage
							text1='Zbyt niska rozdzielczość.'
							text2='Minimalna szerokość to 610px.'
						/>
					)}
				</>
			) : (
				<ErrorMessage text1='Błąd pobierania danych' />
			)}
		</div>
	);
};

export default CurrentSales;
