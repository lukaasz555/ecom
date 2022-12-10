import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Books from './pages/books/Books';
import Music from './pages/music/Music';
import Contact from './pages/contact/Contact';
import Product from './pages/product/Product';

function App() {
	return (
		<div className='min-h-screen w-full'>
			<Routes>
				<Route path='/' element={<Shop />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/music' element={<Music />} />
				<Route path='/contact' element={<Contact />} />
				<Route path={`/shop/product/:id`} element={<Product />} />
				<Route path={`/shop/product/book/:id`} element={<Product />} />
				<Route path={`/shop/product/music/:id`} element={<Product />} />
			</Routes>
		</div>
	);
}

export default App;
