import Chart from 'react-apexcharts';
import { OrderModel } from '../../../models/Order';
import { ProductModel } from '../../../models/Product';
import {
	getTypeOfProduct,
	getNameOfProduct,
} from '../../../helpers/getProductData';

type CurrentSalesProps = {
	allOrders: OrderModel[];
	products: ProductModel[];
};

const TopProducts = ({ allOrders, products }: CurrentSalesProps) => {
	const productsIDs = allOrders
		.map((obj) => obj.order.items.map((item) => item.id))
		.flat();

	const uniqueIDs = Array.from(new Set(productsIDs.map((p) => p)));

	const checkIdFreq = (arr: string[], id: string) => {
		return {
			item: id,
			title: getNameOfProduct(products, id),
			type: getTypeOfProduct(products, id),
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
		console.log(record.sort((a, b) => Number(b.qty) - Number(a.qty)));
		return record.sort((a, b) => Number(b.qty) - Number(a.qty));
	};

	const chartOptions = {
		chart: {
			id: 'apexchart-example',
		},
		xaxis: {
			categories: getMostSoldItems()
				.slice(0, 10)
				.map((item) => item.title),
		},
		plotOptions: {
			bar: {
				borderRadius: 0,
				horizontal: true,
			},
		},
		dataLabels: {
			enabled: true,
		},
	};

	const chartSeries = [
		{
			name: 'Ilość sztuk: ',
			data: getMostSoldItems()
				.slice(0, 10)
				.map((item) => item.qty),
		},
	];

	return (
		<div className='w-full flex flex-col items-center my-10'>
			<h3 className='mb-5'>Top 10 produktów:</h3>
			<Chart
				options={chartOptions}
				series={chartSeries}
				type='bar'
				horizontal={true}
				height={400}
				width={400}
			/>
		</div>
	);
};

export default TopProducts;
