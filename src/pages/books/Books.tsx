import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Music from '../../components/organisms/music/Music';
import { books } from '../../data/books';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';

const Books = () => {
	const items = books;

	const getCategories = () => {
		const cats = new Set(items.map((i) => i.category));
		const arr = Array.from(cats);
		return [...arr, 'sale'];
	};

	getCategories();

	return (
		<Layout>
			<Routes>
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/music' element={<Music />} />
			</Routes>
			<nav className='my-10 flex justify-center items-center'>
				{getCategories().map((cat) => (
					<button className='border-r-[1px] px-5 last:border-none'>
						<p className='text-[16px] font-extralight'>{cat.toUpperCase()}</p>
					</button>
				))}
			</nav>
			<main className='flex flex-wrap justify-center lg:justify-start'>
				{items.map(({ id, title, price, img, discount = 0 }) => (
					<ItemCard
						key={id}
						id={id}
						title={title}
						price={price}
						img={img}
						discount={discount}
					/>
				))}
			</main>
		</Layout>
	);
};

export default Books;
