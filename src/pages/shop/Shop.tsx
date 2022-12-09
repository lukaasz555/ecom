import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Books from '../../components/organisms/books/Books';
import Music from '../../components/organisms/music/Music';
import { books } from '../../data/books';
import ItemCard from '../../components/molecules/ItemCard/ItemCard';

const Shop = () => {
	const items = books;

	return (
		<Layout>
			<Routes>
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/music' element={<Music />} />
			</Routes>
			<h3>shop page</h3>
			<main className='flex'>
				{items.map(({ id, title, price, img, discount = 0 }) => (
					<ItemCard
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

export default Shop;
