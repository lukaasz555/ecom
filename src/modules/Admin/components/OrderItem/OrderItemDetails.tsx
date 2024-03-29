import React from 'react';
import { handleNumbFormat } from '../../../../helpers/handleNumbFormat';
import { OrderModel } from '../../../../models/Order';
import { getQty } from '../../../../helpers/getQty';
import Status from '../Status/Status';
import CloseIcon from '../../../../components/shared/CloseIcon/CloseIcon';

interface IOrderItemDetails {
	open: boolean;
	order: OrderModel;
	closeModal: () => void;
}

const OrderItemDetails = ({ open, order, closeModal }: IOrderItemDetails) => {
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
			className={`mb-5 py-4 px-6 bg-gray ${
				open ? 'block' : 'hidden'
			} border-[1px] mt-2 w-[100%]`}>
			<div className='flex justify-end mb-6'>
				<button>
					<CloseIcon height={18} width={18} onClick={closeModal} />
				</button>
			</div>
			<div className='flex flex-col gap-y-3 flex-wrap'>
				<Status id={order._id} status={order.status} />
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
							{uniqueItems.map((item) => (
								<>
									{item !== undefined ? (
										<div className='flex justify-start text-s'>
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
									) : null}
								</>
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
						</>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItemDetails;
