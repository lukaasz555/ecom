import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/Shop';
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
				<Route path='/contact' element={<Contact />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route
					path={`/shop/products/:category/:catID`}
					element={<ProductsList />}
				/>
				<Route
					path={`/shop/products/:category/item/:id`}
					element={<Product />}
				/>
				<Route path='/admin' element={<Admin />} />
				<Route path='/admin/orders' element={<AdminOrders />} />
				<Route path='/admin/products' element={<AdminProducts />} />
				<Route path='/admin/products/edit/:id' element={<EditProduct />} />
				<Route path='/admin/sales' element={<Sales />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
