import React from 'react';
import { OrderModel } from '../../../../models/Order';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';

interface IOrderItem {
	order: OrderModel;
}

const OrderItem = ({ order }: IOrderItem) => {
	const { orderId } = order;
	const { name, lastname, nip, companyName } = order.customer.customerData;
	const { address1, address2, postalCode, country, city } =
		order.customer.address;
	const { phoneNumber, email } = order.customer.contact;
	const { inpost } = order.order.ship;
	return (
		<div>
			<div key={orderId} className='flex w-full'>
				<div className='basis-[15%] border-r-[1px] text-center pb-1'>
					{orderId}
				</div>
				<div className='basis-[45%] border-r-[1px] text-center pb-1'>
					<p>
						{order.customer.customerData.name}{' '}
						{order.customer.customerData.lastname}
					</p>
				</div>
				<div className='basis-[15%] border-r-[1px] text-center pb-1'>
					{handleNumbFormat(order.order.value)} zł
				</div>
				<div className='basis-[25%] text-center pb-1'>data</div>
			</div>
			<div className='mb-5 py-2 px-3 bg-gray'>
				<div className='flex justify-between'>
					<div>
						<p>
							{name} {lastname}{' '}
						</p>
						{nip ? <p>NIP: {nip}</p> : null}
						{companyName ? <p>{companyName}</p> : null}
						<p>{address1}</p>
						<p>{address2 ? address2 : null}</p>
						<p>
							{postalCode} {city}
						</p>
						<p>{country}</p>
					</div>
					<div className='flex flex-col items-end'>
						<p>mail: {email}</p>
						<p>tel: {phoneNumber}</p>
						<p>Paczkomat: {inpost}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
