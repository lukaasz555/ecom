import React from 'react';
import { OrderModel } from '../../../../models/Order';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';
import moment from 'moment';
import { handleStatusName } from '../../../../helpers/handleStatusName';

interface IOrderItem {
	order: OrderModel;
	selectOrder: (id: string) => void;
}

const OrderItem = ({ order, selectOrder }: IOrderItem) => {
	const { status, createdAt } = order;

	return (
		<>
			<tr
				onClick={() => selectOrder(order._id)}
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
	);
};

export default OrderItem;
