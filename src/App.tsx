import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import PreCheckout from './modules/Shop/views/PreCheckout';
import Register from './modules/Shop/views/Register';
import Login from './modules/Shop/views/Login';
import Account from './modules/Shop/views/Account';
import Settings from './modules/Shop/components/organisms/Settings/Settings';
import OrdersHistory from './modules/Shop/components/organisms/OrdersHistory/OrdersHistory';
import Password from './modules/Shop/components/organisms/Password/Password';
import { useAppSelector } from './hooks/hooks';
import { UserRolesEnum } from './enums/UserRolesEnum';

function App() {
	const user = useAppSelector((state) => state.userReducer.user);

	return (
		<div className='min-h-[101vh] w-full'>
			<Routes>
				<Route path='/' element={<Shop />} />
				{user ? (
					<Route path='account' element={<Account />}>
						<Route path='my-orders' element={<OrdersHistory />} />
						<Route path='settings' element={<Settings />} />
						<Route path='password' element={<Password />} />
					</Route>
				) : (
					<Route path='/account/*' element={<Navigate to='/login' />} />
				)}

				<Route path='shop' element={<Shop />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/precheckout' element={<PreCheckout />} />
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
				{user && user.role === UserRolesEnum.Admin ? (
					<>
						<Route path='/admin' element={<Admin />} />
						<Route path='/admin/orders' element={<AdminOrders />} />
						<Route path='/admin/products' element={<AdminProducts />} />
						<Route path='/admin/products/edit/:id' element={<EditProduct />} />
						<Route path='/admin/sales' element={<Sales />} />
						<Route path='/admin/*' element={<Admin />} />
					</>
				) : (
					<Route path='/admin/*' element={<Navigate to='/' />} />
				)}

				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
