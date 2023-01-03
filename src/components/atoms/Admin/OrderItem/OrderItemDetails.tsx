import React, { useEffect, useState } from 'react';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';
import { OrderModel } from '../../../../models/Order';
import { getQty } from '../../../../helpers/getQty';
import { ProductModel } from '../../../../models/Product';

interface IOrderItemDetails {
	open: boolean;
	order: OrderModel;
}

const OrderItemDetails = ({ open, order }: IOrderItemDetails) => {
	const { _id } = order;
	const { name, lastname, nip, companyName } = order.customer.customerData;
	const { address1, address2, postalCode, country, city } =
		order.customer.address;
	const { phoneNumber, email } = order.customer.contact;
	const { cost, inpost } = order.order.ship;

	const uniqueItems = Array.from(
		new Set(order.order.items.map((item) => item.id))
	).map((id) => order.order.items.find((item) => item.id === id));

	return (
		<div
			className={`mb-5 py-2 px-3 bg-gray duration-150 origin-top ${
				open ? 'block' : 'hidden'
			} border-[1px] mt-2 `}>
			<div className='flex flex-col gap-y-3'>
				<div>
					<p className='font-[500]'>Zamówienie nr: {_id}</p>
				</div>
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
						<>
							{uniqueItems.map((item) => {
								return (
									<>
										{item === undefined ? null : (
											<div className='flex justify-start text-s' key={item.id}>
												<div id={item.id}>
													<p>
														<span>{item.title}</span>
														<span className='mx-1'>
															{getQty(item.id, order.order.items) > 1
																? `(${getQty(item.id, order.order.items)}x)`
																: null}
														</span>{' '}
													</p>
												</div>
												<div>
													<p>
														- {handleNumbFormat(item.price - item.discount)} zł
													</p>
												</div>
											</div>
										)}
									</>
								);
							})}

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
						</>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItemDetails;
