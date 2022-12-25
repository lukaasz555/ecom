import React, { useState } from 'react';
import { OrderModel } from '../../../../models/Order';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';
import OrderItemDetails from './OrderItemDetails';

interface IOrderItem {
	order: OrderModel;
}

const OrderItem = ({ order }: IOrderItem) => {
	const [open, setOpen] = useState(false);
	const { orderId, status } = order;

	return (
		<div className='odd:bg-white even:bg-gray'>
			<div key={orderId} className='flex justify-start items-center w-full'>
				<div className='basis-[15%] min-w-[80px] border-r-[1px] text-center py-1'>
					<button onClick={() => setOpen(!open)} className='cursor-pointer'>
						{orderId}
					</button>
				</div>
				<div className='basis-[15%] min-w-[80px] border-r-[1px] text-center py-1 w-full'>
					<p>{status}</p>
				</div>
				<div className='hidden lg:block basis-[35%] border-r-[1px] text-center py-1'>
					<p>
						{order.customer.customerData.name}{' '}
						{order.customer.customerData.lastname}
					</p>
				</div>
				<div className='basis-[15%] min-w-[80px] border-r-[1px] text-center py-1'>
					<p>{handleNumbFormat(order.order.value)} zł</p>
				</div>
				<div className='basis-[10%] text-center py-1'>
					<p>data</p>
				</div>
			</div>
			<OrderItemDetails open={open} order={order} />
		</div>
	);
};

export default OrderItem;
