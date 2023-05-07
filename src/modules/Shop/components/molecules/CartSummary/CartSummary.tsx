import React from 'react';
import CartSummaryItems from '../../atoms/CartSummaryItems/CartSummaryItems';
import { useAppSelector } from '../../../../../hooks/hooks';
import { handleNumbFormat } from '../../../../../helpers/handleNumbFormat';
import { productsValue } from '../../../../../helpers/productsValue';
import { getDiscountsValue } from '../../../../../helpers/getDiscountsValue';

const CartSummary = () => {
	const items = useAppSelector((state) => state.cartReducer.items);
	const discounts: number = getDiscountsValue(items);
	const itemsCost: number = productsValue(items);
	const deliveryCost: number = itemsCost >= 99 ? 0 : 9.9;
	const total: number = itemsCost + deliveryCost;

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] lg:basis-[48%] '>
			<h2 className='text-xl font-[400] font-lato mb-3'>Twoje zamówienie</h2>
			<CartSummaryItems items={items} />
			<div>
				<div>
					<div className='flex flex-col md:items-end mt-10 border-t-[1px] pt-3 border-[#C7C7C7]'>
						{discounts > 0 ? (
							<p className='text-m font-lato text-sparkle font-[300]'>
								Rabaty: <span>{handleNumbFormat(discounts)}zł</span>
							</p>
						) : null}
						<p className='text-m font-lato text-sparkle font-[300]'>
							Wysyłka: {handleNumbFormat(deliveryCost)}zł
						</p>
						<p className='font-lato text-l mt-3'>
							Do zapłaty {handleNumbFormat(total)}zł
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartSummary;
