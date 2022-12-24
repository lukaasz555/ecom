import React, { useState } from 'react';
import { OrderModel } from '../../../../models/Order';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';
import { getQty } from '../../../../helpers/getQty';

interface IOrderItem {
	order: OrderModel;
}

const OrderItem = ({ order }: IOrderItem) => {
	const [open, setOpen] = useState(false);
	const { orderId, status } = order;
	const { name, lastname, nip, companyName } = order.customer.customerData;
	const { address1, address2, postalCode, country, city } =
		order.customer.address;
	const { phoneNumber, email } = order.customer.contact;
	const { cost, inpost } = order.order.ship;

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
			<div
				className={`mb-5 py-2 px-3 bg-gray duration-150 origin-top ${
					open ? 'block' : 'hidden'
				} border-[1px] mt-2 `}>
				<div className='flex flex-col'>
					<div className='flex flex-col lg:flex-row lg:justify-between'>
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
						<div className='flex flex-col mt-5 lg:mt-0 lg:items-end text-s'>
							<p>mail: {email}</p>
							<p>tel: {phoneNumber}</p>
							<p>Paczkomat: {inpost}</p>
						</div>
					</div>
					<div className='my-3'>
						<h4 className='text-s underline'>Produkty:</h4>
						<div>
							{order.order.items.map(({ title, id, price, discount }) => (
								<div className='flex justify-start text-s'>
									<div>
										<p>
											<span>{title}</span>
											<span className='mx-1'>
												{getQty(id, order.order.items) > 1
													? `(${getQty(id, order.order.items)}x)`
													: null}
											</span>
										</p>
									</div>
									<div>
										<p>- {handleNumbFormat(price - discount)} zł</p>
									</div>
								</div>
							))}
							<div className='flex justify-start text-s'>
								<div>
									<p>Wysyłka: {handleNumbFormat(cost)} zł</p>
								</div>
							</div>
							<div className='mt-2'>
								<p className='text-s font-[500]'>
									Kwota brutto: {handleNumbFormat(order.order.value + cost)} zł
								</p>
								<p className='text-s font-[500]'>
									Kwota netto:{' '}
									{handleNumbFormat((order.order.value + cost) / 1.23)} zł
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
