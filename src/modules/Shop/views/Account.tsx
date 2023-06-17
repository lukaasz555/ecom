import React from 'react';
import Layout from '../components/templates/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Settings from '../components/organisms/Settings/Settings';
import OrdersHistory from '../components/organisms/OrdersHistory/OrdersHistory';
import AccountNav from '../components/atoms/AccountMenu/AccountNav';

interface AccountProps {
	children?: React.ReactNode;
}

const Account = ({ children }: AccountProps) => {
	return (
		<Layout>
			<div className='flex flex-col lg:flex-row lg:items-start'>
				<AccountNav />
				<section className='flex flex-col mt-4 lg:mt-0 w-[100%] min-h-[400px]'>
					<Routes>
						<Route path='my-orders' element={<OrdersHistory />} />
						<Route path='settings' element={<Settings />} />
					</Routes>
				</section>
			</div>
		</Layout>
	);
};

export default Account;
