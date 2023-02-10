import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';
import moment from 'moment';
import { getMonthlyData } from '../../../helpers/getMonthlyData';
import { OrderModel } from '../../../models/Order';

type CurrentSalesProps = {
	allOrders: OrderModel[];
};

const CurrentSales = ({ allOrders }: CurrentSalesProps) => {
	const monthsOfOrders = Array.from(
		new Set(allOrders.map((item) => moment(item.createdAt).format('M')))
	);

	const chartData = monthsOfOrders.map((item) =>
		getMonthlyData(allOrders, item)
	);

	return (
		<div className='w-full flex flex-col items-center mt-10 pb-10 border-b-[1px] border-lightGray'>
			<h3 className='mb-5'>Podsumowanie dotychczasowej sprzedaży:</h3>
			<AreaChart
				width={400}
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
				<Area
					type='monotone'
					dataKey='orders'
					stackId='1'
					stroke='#ffc658'
					fill='#ffc658'
				/>
			</AreaChart>
		</div>
	);
};

export default CurrentSales;
