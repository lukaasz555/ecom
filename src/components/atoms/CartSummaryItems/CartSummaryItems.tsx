import React from 'react';
import { ProductModel } from '../../../models/Product';
import { useAppSelector } from '../../../hooks/hooks';
import { handleNumbFormat } from '../../../helpers/handleNumbFormat';
import { getQty } from '../../../helpers/getQty';

interface CartSumProps {
	items: ProductModel[];
}

const CartSummaryItems = ({ items }: CartSumProps) => {
	const uniqItems = useAppSelector((state) => state.uniqueItems);
	return (
		<div>
			{uniqItems.map(({ id, title, price, discount, authors }) => (
				<div key={id} className='flex justify-between items-center mb-3'>
					<div className='basis-[60%]'>
						<h4 className='text-m font-lato'>{title}</h4>
						<h5 className='text-s text-sparkle font-lato'>
							{authors.join(', ')}
						</h5>
					</div>
					<div className='text-m font-lato font-[300] flex flex-col items-center'>
						<p>{handleNumbFormat(price - discount)}zł</p>
						{getQty(id, items) > 1 ? (
							<p className='text-brownSugar'>{getQty(id, items)}x</p>
						) : null}
					</div>
				</div>
			))}
		</div>
	);
};

export default CartSummaryItems;
