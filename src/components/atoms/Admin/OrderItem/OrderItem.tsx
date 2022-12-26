import React, { useState } from 'react';
import { OrderModel } from '../../../../models/Order';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';
import OrderItemDetails from './OrderItemDetails';

interface IOrderItem {
	order: OrderModel;
}

const OrderItem = ({ order }: IOrderItem) => {
	const [open, setOpen] = useState(false);
	const { _id, status } = order;

	return (
		<div className='odd:bg-white even:bg-gray'>
			<div
				onClick={() => setOpen(!open)}
				key={_id}
				className='flex justify-start items-center w-full'>
				<div className='basis-[20%] min-w-[80px] border-r-[1px] text-center py-1 w-full'>
					<p>{status}</p>
				</div>
				<div className=' basis-[50%] min-w-[120px] border-r-[1px] text-center py-1'>
					<p>
						{order.customer.customerData.name}{' '}
						{order.customer.customerData.lastname}
					</p>
				</div>
				<div className='basis-[15%] min-w-[80px] border-r-[1px] text-center py-1'>
					<p>{handleNumbFormat(order.order.value)} zł</p>
				</div>
				<div className='basis-[15%] text-center py-1'>
					<p>data</p>
				</div>
			</div>
			<OrderItemDetails open={open} order={order} key={`item-${order._id}`} />
		</div>
	);
};

export default OrderItem;
