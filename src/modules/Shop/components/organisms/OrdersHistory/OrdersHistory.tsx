import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../hooks/hooks';
import { fetchUserOrders } from '../../../../../services/orders.service';
import { OrderModel } from '../../../../../models/Order';
import { handleNumbFormat } from '../../../../../helpers/handleNumbFormat';
import moment from 'moment';

const OrdersHistory = () => {
	const user = useAppSelector((state) => state.userReducer.user);
	const [usersOrder, setUsersOrder] = useState<OrderModel[]>([]);

	useEffect(() => {
		if (user) {
			fetchUserOrders(user.id).then((res) => {
				setUsersOrder(res);
			});
		}
	}, [user]);

	return (
		<>
			<div className='flex flex-col items-start m-4 mt-0 ml-8'>
				<h2 className='uppercase text-xl font-lato mb-6'>historia zakupów</h2>
				{Array.isArray(usersOrder) && usersOrder.length > 0 ? (
					usersOrder.map((x) => (
						<div key={x._id} className='flex gap-x-4'>
							<p>{moment(x.createdAt).format('DD-MM-YYYY')}</p>
							<p className='font-medium'>Nr zam: {x._id}</p>
							<p>kwota - {handleNumbFormat(x.order.value)} zł</p>
						</div>
					))
				) : (
					<p>Brak zamówień w historii</p>
				)}
			</div>
		</>
	);
};

export default OrdersHistory;
