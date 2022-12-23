import React from 'react';
import { ICheckoutForm } from '../../../models/CheckoutData';
import OrderComplete from '../OrderComplete/OrderComplete';
import { clearCart } from '../../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import InvoiceDetails from '../../atoms/OrderSummaryComponents/InvoiceDetails';
import ContactDetails from '../../atoms/OrderSummaryComponents/ContactDetails';
import ItemsDetails from '../../atoms/OrderSummaryComponents/ItemsDetails';
import OrderSummaryTop from '../../atoms/OrderSummaryComponents/OrderSummaryTop';
import OrderSummaryBottom from '../../atoms/OrderSummaryComponents/OrderSummaryBottom';
import { productsValue } from '../../../helpers/productsValue';
import axios from 'axios';

interface OrderSummaryProps {
	checkoutForm: ICheckoutForm;
	setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
	orderDone: boolean;
	setOrderDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderSummary = ({
	checkoutForm,
	setFormFilled,
	orderDone,
	setOrderDone,
}: OrderSummaryProps) => {
	const { emailAddress } = checkoutForm.email;
	const { phoneNumber, inpost } = checkoutForm.ship;
	const items = useAppSelector((state) => state.items);
	const itemsValue = productsValue(items);
	const deliveryCost = itemsValue >= 99 ? 0 : 9.9;
	const total = itemsValue + deliveryCost;

	const dispatch = useAppDispatch();

	const newOrder = {
		customer: {
			customerData: {
				name: checkoutForm.invoice.name,
				lastname: checkoutForm.invoice.lastname,
				nip: checkoutForm.invoice.nip,
				companyName: checkoutForm.invoice.companyName,
			},

			contact: {
				email: checkoutForm.email.emailAddress,
				phoneNumber: checkoutForm.ship.phoneNumber,
			},

			address: {
				address1: checkoutForm.invoice.address1,
				address2: checkoutForm.invoice.address2,
				postalCode: checkoutForm.invoice.postalCode,
				country: checkoutForm.invoice.country,
			},
		},

		order: {
			items: items,
			qty: items.length,
			value: total.toFixed(2),

			ship: {
				inpost: checkoutForm.ship.inpost,
			},
		},
	};

	const handleClick = () => {
		axios.post('http://localhost:1337/orders/new', newOrder);
		console.log(newOrder);
		dispatch(clearCart());
		setOrderDone(true);
	};

	return (
		<div className='OrderSummary bg-white px-4 py-5 border-[#C7C7C7] border-[1px] w-full flex flex-col gap-y-8 '>
			{!orderDone ? (
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
			) : (
				<OrderComplete />
			)}
		</div>
	);
};

export default OrderSummary;
