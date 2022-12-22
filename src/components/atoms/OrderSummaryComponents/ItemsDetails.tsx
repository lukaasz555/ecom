import React from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { getQty } from '../../../helpers/getQty';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { productsValue } from '../../../helpers/productsValue';

const ItemsDetails = (): JSX.Element => {
	const items = useAppSelector((state) => state.items);
	const uniqItems = useAppSelector((state) => state.uniqueItems);

	const itemsCost: number = productsValue(items);
	const deliveryCost: number = 9.9;
	const total: number = itemsCost + deliveryCost;

	return (
		<>
			<div className='flex flex-col'>
				<h3 className='font-lato font-[400] mb-2'>Produkty:</h3>
				<div className='flex flex-col items-between font-lato text-s font-[300] '>
					<div className='flex border-b-[1px] mb-1 pb-1 px-3 justify-between '>
						<div className='basis-[60%]'>
							<p>nazwa</p>
						</div>
						<div className='basis-[15%] text-center'>
							<p>ilość</p>
						</div>
						<div className='basis-[15%] text-right'>
							<p>cena</p>
						</div>
					</div>

					{uniqItems.map(({ title, price, discount, id }) => (
						<div key={id} className='flex font-[400] px-3 justify-between mb-1'>
							<div className='basis-[60%]'>
								<p>{title}</p>
							</div>
							<div className='basis-[15%] text-center'>
								<p>{getQty(id, items)}</p>
							</div>
							<div className='basis-[15%] text-right'>
								<p>
									{handleNumbFormat(getQty(id, items) * (price - discount))} zł
								</p>
							</div>
						</div>
					))}

					{itemsCost <= 99 ? (
						<div className='flex font-[400] px-3'>
							<div className='basis-[60%] '>
								<p>Wysyłka - Paczkomaty InPost</p>
							</div>

							<div className='basis-[40%] text-right'>
								<p>{handleNumbFormat(deliveryCost)} zł</p>
							</div>
						</div>
					) : null}

					<div className='flex font-[400] px-3 mt-3 justify-end'>
						<div>
							<p className='text-m'>Łącznie: {handleNumbFormat(total)} zł</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemsDetails;
