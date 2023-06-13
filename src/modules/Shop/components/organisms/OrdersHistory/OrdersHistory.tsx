import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../hooks/hooks';
import { fetchUserOrders } from '../../../../../services/orders.service';
import { OrderModel } from '../../../../../models/Order';
import { handleNumbFormat } from '../../../../../helpers/handleNumbFormat';
import moment from 'moment';
import Loader from '../../../../../components/shared/Loader/Loader';
import ErrorMessage from '../../../../../components/shared/ErrorMessage/ErrorMessage';

const OrdersHistory = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [usersOrder, setUsersOrder] = useState<OrderModel[]>([]);

	useEffect(() => {
		if (user) {
			setLoading(true);
			fetchUserOrders(user.id)
				.then((res) => {
					if (Array.isArray(res)) {
						setUsersOrder(res);
						setError(false);
					} else setError(true);
				})
				.finally(() => setLoading(false));
		}
	}, [user]);

	return (
		<>
			<div className='flex flex-col items-start m-4 mt-0 ml-8'>
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
					) : Array.isArray(usersOrder) && usersOrder.length > 0 ? (
						usersOrder.map((x) => (
							<div key={x._id} className='flex gap-x-4'>
								<p>{moment(x.createdAt).format('DD-MM-YYYY')}</p>
								<p className='font-medium'>Nr zam: {x._id}</p>
								<p>kwota - {handleNumbFormat(x.order.value)} zł</p>
							</div>
						))
					) : !Array.isArray(usersOrder) ? (
						<p>Brak zamówień w historii</p>
					) : null}
				</div>
			</div>
		</>
	);
};

export default OrdersHistory;
