import React, { useState } from 'react';
import { OrderModel } from '../../../../models/Order';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';
import OrderItemDetails from './OrderItemDetails';
import moment from 'moment';
import { handleStatusName } from '../../../../helpers/handleStatusName';

interface IOrderItem {
	order: OrderModel;
}

const OrderItem = ({ order }: IOrderItem) => {
	const [open, setOpen] = useState(false);
	const { status, createdAt } = order;

	return (
		// <div className='odd:bg-white even:bg-gray'>
		// 	<div
		// 		onClick={() => setOpen(!open)}
		// 		className='flex justify-start items-center w-full min-w-[350px] text-s'>
		// 		<div className='basis-[20%] min-w-[80px] border-r-[1px] text-center py-1 w-full'>
		// 			<p
		// 				className={`${
		// 					status === 'completed'
		// 						? 'text-darkGreen'
		// 						: status === 'pending'
		// 						? 'text-brownSugar'
		// 						: status === 'cancelled'
		// 						? 'text-pencil'
		// 						: 'text-black'
		// 				}`}>
		// 				{handleStatusName(status)}
		// 			</p>
		// 		</div>
		// 		<div className='basis-[55%] md:basis-[50%] min-w-[120px] border-r-[1px] text-center py-1'>
		// 			<p>
		// 				{order.customer.customerData.name}{' '}
		// 				{order.customer.customerData.lastname}
		// 			</p>
		// 		</div>
		// 		<div className='basis-[25%] md:basis-[15%] min-w-[80px] border-r-[1px] text-center py-1'>
		// 			<p>{handleNumbFormat(order.order.value)} zł</p>
		// 		</div>

		// 		<div className='hidden md:block md:basis-[15%] md:min-w-[60px] text-center py-1'>
		// 			<p>{moment(createdAt).format('DD-MM-YYYY')}</p>
		// 		</div>
		// 	</div>
		// 	<OrderItemDetails open={open} order={order} />
		// </div>
		<>
			<tr
				onClick={() => setOpen(!open)}
				className='odd:bg-white even:bg-gray cursor-pointer hover:outline hover:outline-1 hover:outline-brownSugar'>
				<td
					className={`${
						status === 'completed'
							? 'text-darkGreen'
							: status === 'pending'
							? 'text-brownSugar'
							: status === 'cancelled'
							? 'text-pencil'
							: 'text-black'
					}`}>
					{handleStatusName(order.status)}
				</td>
				<td>
					{order.customer.customerData.name}{' '}
					{order.customer.customerData.lastname}
				</td>
				<td className='text-center'>{handleNumbFormat(order.order.value)}</td>
				<td className='text-center'>
					{moment(createdAt).format('DD-MM-YYYY')}
				</td>
			</tr>
		</>
		// <OrderItemDetails open={open} order={order} />
	);
};

export default OrderItem;
