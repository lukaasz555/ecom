import React, { useEffect, useState } from 'react';
import Layout from '../../components/templates/Layout/Layout';
import CartItem from '../../components/organisms/CartItem/CartItem';
import { books } from '../../data/books';
import { albums } from '../../data/albums';
import { ProductModel } from '../../models/Product';
import EmptyCart from '../../components/atoms/EmptyCart/EmptyCart';

const Cart = () => {
	const [items, setItems] = useState<ProductModel[] | []>([]);

	useEffect(() => {
		const mock = [books[1], albums[16]];
		setItems(mock);
	}, []);

	// napisać funkcję opartą na re

	/* 	const productsValue = items.reduce((acc: number, item: ProductModel) => {
		return acc + (item.price - item.discount);
	}, 0); */

	type ProductsValueReturnType = {
		value: number;
	};

	type ReturnType = {
		value: number;
	};

	/* 	const productsValue = items.reduce<ReturnType>(
		(acc: number, item: { price: number; discount: number }) => {
			const value = acc + (item.price - item.discount);
			return value;
		},
		0
	); */

	const getPrice = (): number => {
		const productsValue = items.reduce(
			(acc: number, item: { price: number; discount: number }) => {
				const value = acc + (item.price - item.discount);
				return value;
			},
			0
		);
		return productsValue;
	};

	return (
		<Layout>
			<div className='lg:px-10 py-10 flex justify-center min-h-screen'>
				{items.length > 0 ? (
					<div className='w-full max-w-[900px] flex flex-col items-end'>
						<div className='flex flex-col w-full'>
							{items.map((item) => (
								<CartItem data={item} key={item.id} />
							))}
						</div>
						<div className='text-right'>
							<p>Wartość produktów: {getPrice().toFixed(2)}zł</p>
							<p>Koszt wysyłki: 9,90zł</p>
							<p>Całkowita wartość zamówienia: TOTAL</p>
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
