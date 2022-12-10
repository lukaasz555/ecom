import React, { useState } from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { music } from '../../data/music';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';
import { ProductModel } from '../../models/Product';

const Music = () => {
	const [items, setItems] = useState<ProductModel[] | []>(music);

	const getCategories = () => {
		const cats = new Set(items.map((i) => i.category));
		const arr = Array.from(cats);
		return [...arr, 'sale'];
	};

	return (
		<Layout>
			<nav className='my-10 flex items-start flex-col xl:flex-row  xl:justify-center'>
				{getCategories().map((cat) => (
					<button
						key={cat}
						className='xl:border-r-[1px] border-sparkle px-5 last:border-none '>
						<p className='text-[16px] font-extralight text-sparkle hover:text-black'>
							{cat.toUpperCase()}
						</p>
					</button>
				))}
			</nav>
			<main className='flex flex-wrap justify-center'>
				{items.map(({ id, title, price, img, discount, authors, type }) => (
					<ItemCard
						key={id}
						id={id}
						title={title}
						price={price}
						img={img}
						discount={discount}
						authors={authors}
						type={type}
					/>
				))}
			</main>
		</Layout>
	);
};

export default Music;
