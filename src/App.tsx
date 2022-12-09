import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Books from './pages/books/Books';
import Music from './components/organisms/music/Music';
import Contact from './pages/contact/Contact';

function App() {
	return (
		<div className='min-h-screen w-full'>
			<Routes>
				<Route path='/' element={<Shop />} />
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/music' element={<Music />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</div>
	);
}

export default App;
