import React from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { getQty } from '../../../helpers/getQty';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { ProductModel } from '../../../models/Product';

const CartSummary = () => {
	const items = useAppSelector((state) => state.cart.items);
	const uniqItems = useAppSelector((state) => state.cart.uniqueItems);

	const productsValue = (arr: ProductModel[]) => {
		if (arr.length > 0) {
			const val = arr.reduce(
				(acc: number, item: { price: number; discount: number }) => {
					return acc + (item.price - item.discount);
				},
				0
			);
			return val;
		} else {
			return 0;
		}
	};

	const getDiscounts = (arr: ProductModel[]) => {
		if (arr.length > 0) {
			const val = arr.reduce((acc: number, item: { discount: number }) => {
				return acc + item.discount;
			}, 0);
			return val;
		} else {
			return 0;
		}
	};

	const discounts: number = getDiscounts(items);
	const itemsCost: number = productsValue(items);
	const deliveryCost: number = itemsCost >= 99 ? 0 : 9.9;
	const total: number = itemsCost + deliveryCost;

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] lg:basis-[48%] '>
			<h2 className='text-xl font-[400] font-lato mb-3'>Twoje zamówienie</h2>
			<div>
				{uniqItems.map((item) => (
					<div className='flex justify-between items-center mb-3'>
						<div className='basis-[60%]'>
							<h4 className='text-m font-lato'>{item.title}</h4>
							<h5 className='text-s text-sparkle font-lato'>
								{item.authors.join(', ')}
							</h5>
						</div>
						<div className='text-m font-lato font-[300] flex flex-col items-center'>
							<p>{handleNumbFormat(item.price - item.discount)}zł</p>
							{getQty(item.id, items) > 1 ? (
								<p className='text-brownSugar'>{getQty(item.id, items)}x</p>
							) : null}
						</div>
					</div>
				))}
			</div>
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
