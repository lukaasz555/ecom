import React, { useState } from 'react';
import { CheckoutForm } from '../../../../../models/CheckoutData';
import OrderComplete from '../OrderComplete/OrderComplete';
import { clearCart } from '../../../../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import InvoiceDetails from '../../atoms/OrderSummaryComponents/InvoiceDetails';
import ContactDetails from '../../atoms/OrderSummaryComponents/ContactDetails';
import ItemsDetails from '../../atoms/OrderSummaryComponents/ItemsDetails';
import OrderSummaryTop from '../../atoms/OrderSummaryComponents/OrderSummaryTop';
import OrderSummaryBottom from '../../atoms/OrderSummaryComponents/OrderSummaryBottom';
import { productsValue } from '../../../../../helpers/productsValue';
import ALT from '../../atoms/ALT/ALT';
import { addOrder } from '../../../../../services/orders.service';
import { NewOrderModel } from '../../../../../models/Order';
import { ProductModel } from '../../../../../models/Product';

interface OrderSummaryProps {
	checkoutForm: CheckoutForm;
	setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
	isOrderDone: boolean;
	setOrderDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderSummary = ({
	checkoutForm,
	setFormFilled,
	isOrderDone,
	setOrderDone,
}: OrderSummaryProps) => {
	const user = useAppSelector((state) => state.userReducer.user);
	const { emailAddress } = checkoutForm.email;
	const { phoneNumber, inpost } = checkoutForm.ship;
	const items: ProductModel[] = useAppSelector(
		(state) => state.cartReducer.items
	);
	const itemsValue = productsValue(items);
	const deliveryCost = itemsValue >= 99 ? 0 : 9.9;
	const dispatch = useAppDispatch();
	const [newOrderId, setNewOrderId] = useState('');
	const [error, setError] = useState(false);

	const newOrder: NewOrderModel = {
		customer: {
			customerId: user?.id || 'guest',
			customerData: {
				name: checkoutForm.invoice.name,
				lastname: checkoutForm.invoice.lastname,
				nip: checkoutForm.invoice.nip,
				companyName: checkoutForm.invoice.companyName,
			},

			contact: {
				email: checkoutForm.email.emailAddress,
				phoneNumber: checkoutForm.ship.phoneNumber,
				newsletter: checkoutForm.email.isConsent,
			},

			address: {
				address1: checkoutForm.invoice.address1,
				address2: checkoutForm.invoice.address2,
				postalCode: checkoutForm.invoice.postalCode,
				city: checkoutForm.invoice.city,
				country: checkoutForm.invoice.country,
			},
		},

		order: {
			items: items,
			qty: items.length,
			value: parseFloat(itemsValue.toFixed(2)),
			ship: {
				inpost: checkoutForm.ship.inpost,
				cost: deliveryCost,
			},
		},
	};

	const handleClick = () => {
		addOrder(newOrder)
			.then((res) => {
				if (res.data) {
					setNewOrderId(res.data._id);
					dispatch(clearCart());
					setError(false);
				}
			})
			.catch((e) => setError(true));
		setOrderDone(true);
	};

	return (
		<div className='OrderSummary bg-white px-4 py-5 border-[#C7C7C7] border-[1px] w-full flex flex-col gap-y-8 '>
			{!isOrderDone ? (
				<>
					<OrderSummaryTop setFormFilled={setFormFilled} />
					<ContactDetails
						emailAddress={emailAddress}
						phoneNumber={phoneNumber}
						inpost={inpost}
					/>
					<InvoiceDetails invoiceDetails={checkoutForm.invoice} />
					<ItemsDetails />
					<OrderSummaryBottom handleClick={handleClick} />
				</>
			) : !error ? (
				<OrderComplete orderId={newOrderId} />
			) : (
				<div className='py-10 flex flex-col items-center'>
					<div className='mt-5'>
						<h1 className='text-center block'>
							Niestety, coś poszło nie tak. <br />
							Spróbuj złożyć zamówienie ponownie.
						</h1>
					</div>
					<div className='mt-10 mb-5'>
						<ALT body='Kliknij, aby wrócić do sklepu' to='/' />
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderSummary;
