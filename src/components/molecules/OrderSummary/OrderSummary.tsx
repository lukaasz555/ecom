import React from 'react';
import { ICheckoutForm } from '../../../models/CheckoutData';
import OrderComplete from '../OrderComplete/OrderComplete';
import { clearCart } from '../../../features/cart/cartSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import InvoiceDetails from '../../atoms/OrderSummaryComponents/InvoiceDetails';
import ContactDetails from '../../atoms/OrderSummaryComponents/ContactDetails';
import ItemsDetails from '../../atoms/OrderSummaryComponents/ItemsDetails';
import OrderSummaryTop from '../../atoms/OrderSummaryComponents/OrderSummaryTop';
import OrderSummaryBottom from '../../atoms/OrderSummaryComponents/OrderSummaryBottom';

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

	const dispatch = useAppDispatch();

	const handleClick = () => {
		console.log(checkoutForm);
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
