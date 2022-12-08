import React from 'react';
import Layout from '../../components/templates/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Books from '../../components/organisms/books/Books';
import Music from '../../components/organisms/music/Music';

const Shop = () => {
	return (
		<Layout>
			<Routes>
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/music' element={<Music />} />
			</Routes>
			<h3>shop page</h3>
		</Layout>
	);
};

export default Shop;
