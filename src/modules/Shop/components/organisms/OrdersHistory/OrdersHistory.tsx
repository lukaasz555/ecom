import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../hooks/hooks';
import { fetchUserOrders } from '../../../../../services/orders.service';
import { OrderModel } from '../../../../../models/Order';
import Loader from '../../../../../components/shared/Loader/Loader';
import ErrorMessage from '../../../../../components/shared/ErrorMessage/ErrorMessage';
import OrdersAccordion from '../../molecules/OrdersAccordion/OrdersAccordion';

const OrdersHistory = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [userOrders, setUserOrders] = useState<OrderModel[]>([]);

	useEffect(() => {
		if (user) {
			setLoading(true);
			fetchUserOrders(user.id)
				.then((res) => {
					if (Array.isArray(res)) {
						setUserOrders(res);
						setError(false);
					} else setError(true);
				})
				.finally(() => setLoading(false));
		}
	}, [user]);

	return (
		<>
			<div className='flex flex-col items-center lg:items-start m-4 lg:mt-0 lg:ml-8'>
				<h2 className='uppercase text-xl font-lato mb-6'>historia zakupów</h2>
				<div className=''>
					{isLoading ? (
						<Loader size='medium' />
					) : isError ? (
						<ErrorMessage
							text1='Nie udało pobrać się zawartości'
							text2='Spróbuj ponownie'
							align='left'
						/>
					) : Array.isArray(userOrders) && userOrders.length > 0 ? (
						<OrdersAccordion items={userOrders} />
					) : !Array.isArray(userOrders) ? (
						<p>Brak zamówień w historii</p>
					) : null}
				</div>
			</div>
		</>
	);
};

export default OrdersHistory;
