import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Shop from './modules/Shop/views/Shop';
import Contact from './modules/Shop/views/Contact';
import Product from './modules/Shop/views/Product';
import Cart from './modules/Shop/views/Cart';
import Checkout from './modules/Shop/views/Checkout';
import Admin from './modules/Admin/views/Admin';
import AdminOrders from './modules/Admin/views/Orders';
import AdminProducts from './modules/Admin/views/Products';
import EditProduct from './modules/Admin/views/EditProduct';
import Sales from './modules/Admin/views/Sales';
import ProductsList from './modules/Shop/views/ProductsList';
import NotFound from './modules/Shop/views/NotFound';
import SearchResult from './modules/Shop/views/SearchResult';

function App() {
	return (
		<div className='min-h-screen w-full'>
			<Routes>
				<Route path='/' element={<Shop />} />
				<Route path='/shop' element={<Shop />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/search-result' element={<SearchResult />} />
				<Route path={`/shop/products/:category`} element={<ProductsList />} />
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
				<Route path='/admin/*' element={<Admin />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
