import React from 'react';
import PriceFilter from '../PriceFilter/PriceFilter';
import DateFilter from '../DateFilter/DateFilter';
import { OrderModel } from '../../../../models/Order';

type AdminOrderProps = {
	priceFilter: boolean;
	dateFilter: boolean;
	setDateFilter: React.Dispatch<React.SetStateAction<boolean>>;
	setPriceFilter: React.Dispatch<React.SetStateAction<boolean>>;
	setFiltered: React.Dispatch<React.SetStateAction<[] | OrderModel[]>>;
	orders: [] | OrderModel[];
};

const AdminOrderTemplate = ({
	priceFilter,
	setPriceFilter,
	dateFilter,
	setDateFilter,
	orders,
	setFiltered,
}: AdminOrderProps) => {
	const handleSort = (type: string) => {
		if (type === 'grow') {
			setFiltered(orders.sort((a, b) => a.order.value - b.order.value));
			setDateFilter(false);
			setPriceFilter(false);
		}

		if (type === 'decrease') {
			setFiltered(orders.sort((a, b) => b.order.value - a.order.value));
			setDateFilter(false);
			setPriceFilter(false);
		}

		if (type === 'latest') {
			setFiltered(
				orders.sort((a, b) => {
					const date1 = new Date(a.createdAt).getTime();
					const date2 = new Date(b.createdAt).getTime();
					return date1 - date2;
				})
			);
			setDateFilter(false);
			setPriceFilter(false);
		}

		if (type === 'older') {
			setFiltered(
				orders.sort((a, b) => {
					const date1 = new Date(a.createdAt).getTime();
					const date2 = new Date(b.createdAt).getTime();
					return date2 - date1;
				})
			);
			setDateFilter(false);
			setPriceFilter(false);
		}
	};

	return (
		<div className='flex w-full justify-start border-b-[1px] text-center'>
			<div className='basis-[20%] min-w-[80px] border-r-[1px] py-1'>
				<p>STATUS</p>
			</div>
			<div className='basis-[55%] md:basis-[50%] min-w-[120px] border-r-[1px] py-1'>
				<p>DANE KLIENTA</p>
			</div>
			<div className='basis-[25%] md:basis-[15%] min-w-[80px] border-r-[1px] py-1 flex flex-col items-center'>
				<button onClick={() => setPriceFilter(!priceFilter)} className='px-2'>
					<p>KWOTA</p>
				</button>
				<PriceFilter priceFilter={priceFilter} handleSort={handleSort} />
			</div>
			<div className='hidden md:block md:basis-[15%] min-w-[60px] text-center py-1 flex flex-col items-center'>
				<button className='px-2' onClick={() => setDateFilter(!dateFilter)}>
					DATA
				</button>
				<DateFilter handleSort={handleSort} dateFilter={dateFilter} />
			</div>
		</div>
	);
};

export default AdminOrderTemplate;
