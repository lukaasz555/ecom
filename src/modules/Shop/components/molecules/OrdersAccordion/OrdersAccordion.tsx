import React, { useState } from 'react';
import { OrderModel } from '../../../../../models/Order';
import moment from 'moment';
import { handleNumbFormat } from '../../../../../helpers/handleNumbFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { handleStatusName } from '../../../../../helpers/handleStatusName';
import { ProductModel } from '../../../../../models/Product';
import { getQty } from '../../../../../helpers/getQty';

interface OrdersAccordionProps {
	items: OrderModel[];
}

const OrdersAccordion = ({ items }: OrdersAccordionProps) => {
	const [activeItemId, setActiveItemId] = useState<string | undefined>(
		undefined
	);

	function toggleItem(id: string): void {
		if (isActive(id)) {
			setActiveItemId(undefined);
		} else setActiveItemId(id);
	}

	function isActive(id: string): boolean {
		if (activeItemId === id) return true;
		else return false;
	}

	function getUniqueProductsList(items: ProductModel[]) {
		const productsIds = Array.from(new Set(items.map((item) => item.id)));
		return productsIds.map((id) => items.find((x) => x.id === id));
	}

	return (
		<div className='w-[500px]'>
			{items.map((x) => (
				<div className='mb-6 text-s min-w-[260px] w-[100%]'>
					<header
						key={x._id}
						className='flex justify-between items-center border-b-[1px] border-lightGray hover:cursor-pointer text-m'
						onClick={() => toggleItem(x._id)}>
						<div>
							<p className='font-medium px-2'>Nr zam: {x._id}</p>
						</div>
						<div>
							<button onClick={() => toggleItem(x._id)}>
								<FontAwesomeIcon
									icon={faChevronDown}
									className={clsx(
										'text-xs ml-2 duration-150',
										isActive(x._id) ? 'rotate-180' : ''
									)}
								/>
							</button>
						</div>
					</header>
					{isActive(x._id) ? (
						<section className='flex flex-col gap-y-4 px-4'>
							<div className='mt-2'>
								<p className='font-medium underline'>Informacje:</p>
								<p>Data: {moment(x.createdAt).format('DD-MM-YYYY')}</p>
								<p>Kwota: {handleNumbFormat(x.order.value)} zł</p>
								<p>Status: {handleStatusName(x.status)}</p>
							</div>
							<div className='flex flex-col'>
								<p className='font-medium underline'>Produkty:</p>
								{getUniqueProductsList(x.order.items).map((p) =>
									p ? (
										<p>
											{p.title}
											<span>
												{getQty(p.id, x.order.items) > 1
													? ` - ${getQty(p.id, x.order.items)}x`
													: null}
											</span>
										</p>
									) : null
								)}
							</div>
							<div>
								<p className='font-medium underline'>Dostawa:</p>
								<p>Nr tel: {x.customer.contact.phoneNumber}</p>
								<p>Paczkomat: {x.order.ship.inpost}</p>
							</div>
						</section>
					) : null}
				</div>
			))}
		</div>
	);
};

export default OrdersAccordion;
