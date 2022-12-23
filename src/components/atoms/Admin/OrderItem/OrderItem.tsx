import React, { useState } from 'react';
import { OrderModel } from '../../../../models/Order';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';

interface IOrderItem {
	order: OrderModel;
}

const OrderItem = ({ order }: IOrderItem) => {
	const [open, setOpen] = useState(false);
	const { orderId } = order;
	const { name, lastname, nip, companyName } = order.customer.customerData;
	const { address1, address2, postalCode, country, city } =
		order.customer.address;
	const { phoneNumber, email } = order.customer.contact;
	const { inpost } = order.order.ship;
	return (
		<div className='odd:bg-white even:bg-gray'>
			<div key={orderId} className='flex justify-start items-center w-full'>
				<div className='basis-[15%] border-r-[1px] text-center py-1'>
					<button onClick={() => setOpen(!open)} className='cursor-pointer'>
						{orderId}
					</button>
				</div>
				<div className='basis-[15%] border-r-[1px] text-center py-1 w-full'>
					<p>status</p>
				</div>
				<div className='basis-[35%] border-r-[1px] text-center py-1'>
					<p>
						{order.customer.customerData.name}{' '}
						{order.customer.customerData.lastname}
					</p>
				</div>
				<div className='basis-[15%] border-r-[1px] text-center py-1'>
					<p>{handleNumbFormat(order.order.value)} zł</p>
				</div>
				<div className='basis-[10%] text-center py-1'>
					<p>data</p>
				</div>
			</div>
			<div
				className={`mb-5 py-2 px-3 bg-gray duration-150 origin-top ${
					open ? 'block' : 'hidden'
				} border-[1px] rounded-[8px] mt-2 bg-white`}>
				<div className='flex justify-between'>
					<div className='text-s'>
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
					<div className='flex flex-col items-end text-s'>
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
