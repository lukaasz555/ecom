import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Books from '../books/Books';
import Music from '../albums/Albums';

const Shop = () => {
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
