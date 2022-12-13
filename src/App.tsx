import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Books from './pages/books/Books';
import Albums from './pages/albums/Albums';
import Contact from './pages/contact/Contact';
import Product from './pages/product/Product';

function App() {
	return (
		<div className='min-h-screen w-full'>
			<Routes>
				<Route path='/' element={<Shop />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/albums' element={<Albums />} />
				<Route path='/contact' element={<Contact />} />
				<Route path={`/shop/product/books/:id`} element={<Product />} />
				<Route path={`/shop/product/albums/:id`} element={<Product />} />
				<Route path={`/shop/books/:catID`} element={<Books />} />
				<Route path={`/shop/albums/:catID`} element={<Albums />} />
			</Routes>
		</div>
	);
}

export default App;
