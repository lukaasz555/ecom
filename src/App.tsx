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
import AdminProducts from './components/organisms/AdminProducts/AdminProducts';
import EditProduct from './components/organisms/EditProduct/EditProduct';
import Sales from './components/organisms/Sales/Sales';
import ProductsList from './pages/ProductsList/ProductsList';
import NotFound from './pages/NotFound/NotFound';

function App() {
	return (
		<div className='min-h-screen w-full'>
			<Routes>
				<Route path='/' element={<Shop />} />
				<Route path='/shop' element={<Shop />} />
				{/* <Route path='/shop/books' element={<Books />} />
				<Route path='/shop/albums' element={<Albums />} /> */}
				<Route path='/contact' element={<Contact />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/checkout' element={<Checkout />} />
				{/* <Route path={`/shop/products/books/:id`} element={<Product />} />
				<Route path={`/shop/products/albums/:id`} element={<Product />} /> */}
				{/* <Route
					path={`/shop/category/albums/:catID`}
					element={<Albums filterCategory={true} />}
				/>
				<Route
					path={`/shop/category/books/:catID`}
					element={<Books filterCategory={true} />}
				/> */}
				{/* categories routes */}
				{/* <Route path={`/shop/products/:category`} element={<ProductsList />} /> */}
				<Route
					path={`/shop/products/:category/:catID`}
					element={<ProductsList />}
				/>
				{/* product routes */}
				<Route path={`/shop/products/albums/item/:id`} element={<Product />} />
				<Route path={`/shop/products/books/item/:id`} element={<Product />} />

				<Route path='/admin' element={<Admin />} />
				<Route path='/admin/orders' element={<AdminOrders />} />
				<Route path='/admin/products' element={<AdminProducts />} />
				<Route path='/admin/products/edit/:id' element={<EditProduct />} />
				<Route path='/admin/sales' element={<Sales />} />
				{/* */}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
