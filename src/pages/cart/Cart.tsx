import React, { useEffect, useState } from 'react';
import Layout from '../../components/templates/Layout/Layout';
import CartItem from '../../components/organisms/CartItem/CartItem';
import { books } from '../../data/books';
import { albums } from '../../data/albums';
import { ProductModel } from '../../models/Product';
import EmptyCart from '../../components/atoms/EmptyCart/EmptyCart';
import CTA from '../../components/atoms/CTA/CTA';
import { handleNumbFormat } from '../../helpers/handleNumbFormat';

const Cart = () => {
	const [items, setItems] = useState<ProductModel[] | []>([]);

	useEffect(() => {
		const mock = [books[1], albums[16], albums[15]];
		setItems(mock);
	}, []);

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

	const itemsCost: number = productsValue(items);
	const deliveryCost: number = itemsCost >= 99 ? 0 : 9.9;
	const total: number = itemsCost + deliveryCost;

	return (
		<Layout>
			<div className='lg:px-10 py-10 flex justify-center'>
				{items.length > 0 ? (
					<div
						className='w-full max-w-[900px] flex flex-col  
					 items-center lg:items-end '>
						<div className='flex flex-col w-full'>
							{items.map((item) => (
								<CartItem data={item} key={item.id} />
							))}
						</div>
						<div className='text-center lg:text-right font-lato font-light'>
							{items instanceof Array ? (
								<p>
									Wartość produktów: {handleNumbFormat(productsValue(items))}zł
								</p>
							) : null}

							<p>Koszt wysyłki: {handleNumbFormat(deliveryCost)}zł</p>

							{items instanceof Array ? (
								<p className='my-3 font-[500] text-[18px]'>
									Całkowita wartość zamówienia: {handleNumbFormat(total)}zł
								</p>
							) : null}
						</div>
						<div>
							<CTA body='dalej' />
						</div>
					</div>
				) : (
					<EmptyCart />
				)}
			</div>
		</Layout>
	);
};

export default Cart;
