import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/Shop';
import Books from './pages/books/Books';
import Albums from './pages/albums/Albums';
import Contact from './pages/contact/Contact';
import Product from './pages/product/Product';
import Cart from './pages/cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Admin from './pages/admin/Admin';
import AdminOrders from './components/organisms/AdminOrders/AdminOrders';
import AdminCustomers from './components/organisms/AdminCustomers/AdminCustomers';
import AdminProducts from './components/organisms/AdminProducts/AdminProducts';

function App() {
	return (
		<div className='min-h-screen w-full'>
			<Routes>
				<Route path='/' element={<Shop />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/shop/books' element={<Books />} />
				<Route path='/shop/albums' element={<Albums />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/cart' element={<Cart />} />
				<Route path={`/shop/product/books/:id`} element={<Product />} />
				<Route path={`/shop/product/albums/:id`} element={<Product />} />
				<Route
					path={`/shop/category/albums/:catID`}
					element={<Albums filterCategory={true} />}
				/>
				<Route
					path={`/shop/category/books/:catID`}
					element={<Books filterCategory={true} />}
				/>
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/admin/orders' element={<AdminOrders />} />
				<Route path='/admin/customers' element={<AdminCustomers />} />
				<Route path='/admin/products' element={<AdminProducts />} />
			</Routes>
		</div>
	);
}

export default App;
