import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Books from '../books/Books';
import Music from '../music/Music';
import { books } from '../../data/books';

const Shop = () => {
	const items = books;

	const getCategories = () => {
		const cats = new Set(items.map((i) => i.category));
		return Array.from(cats);
	};

	getCategories();

	return (
		<Layout>
			<Routes>
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/music' element={<Music />} />
			</Routes>
			<main className='flex flex-wrap justify-center lg:justify-start'>
				homepage
			</main>
		</Layout>
	);
};

export default Shop;
