import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmailSection from '../../components/molecules/EmailSection/EmailSection';
import InvoiceSection from '../../components/molecules/InvoiceSection/InvoiceSection';
import ShippingSection from '../../components/molecules/ShippingSection/ShippingSection';
import { ICheckoutForm } from '../../models/CheckoutData';
import { initialCheckoutForm } from '../../helpers/initialStates';
import OrderSummary from '../../components/molecules/OrderSummary/OrderSummary';
import CartSummary from '../../components/molecules/CartSummary/CartSummary';
import { useAppSelector } from '../../hooks/hooks';

const Checkout = () => {
	const [isEmailOpen, setEmailOpen] = useState(true);
	const [isInvoiceOpen, setInvoiceOpen] = useState(false);
	const [isShippingOpen, setShippingOpen] = useState(false);
	const [checkoutForm, setCheckoutForm] =
		useState<ICheckoutForm>(initialCheckoutForm);
	const [isFormFilled, setFormFilled] = useState(false);
	const [orderDone, setOrderDone] = useState(false);

	const items = useAppSelector((state) => state.items);
	const navigate = useNavigate();

	useEffect(() => {
		if (items.length < 1 && !orderDone) {
			navigate('/cart');
		}
	}, [items]);

	return (
		<div className='flex flex-col items-center bg-gray min-h-screen'>
			<div className='w-full flex justify-center bg-white border-b-[1px] border-[#C7C7C7] px-2 lg:px-0'>
				<header className='w-full max-w-[900px] bg-white py-3'>
					<h1 className='font-medium text-2xl font-montserrat'>
						<Link to={`/`}>someStore</Link>
					</h1>
				</header>
			</div>
			<main className='flex flex-col lg:flex-row lg:justify-between lg:items-start w-full max-w-[900px] my-10 px-2 lg:px-0'>
				{isFormFilled ? (
					<OrderSummary
						checkoutForm={checkoutForm}
						setFormFilled={setFormFilled}
						orderDone={orderDone}
						setOrderDone={setOrderDone}
					/>
				) : (
					<>
						<div className='lg:basis-[48%] flex flex-col gap-y-5 mb-3'>
							<EmailSection
								isEmailOpen={isEmailOpen}
								setEmailOpen={setEmailOpen}
								setInvoiceOpen={setInvoiceOpen}
								checkoutForm={checkoutForm}
								setCheckoutForm={setCheckoutForm}
							/>
							<InvoiceSection
								isInvoiceOpen={isInvoiceOpen}
								setInvoiceOpen={setInvoiceOpen}
								setShippingOpen={setShippingOpen}
								checkoutForm={checkoutForm}
								setCheckoutForm={setCheckoutForm}
							/>
							<ShippingSection
								isShippingOpen={isShippingOpen}
								setShippingOpen={setShippingOpen}
								checkoutForm={checkoutForm}
								setCheckoutForm={setCheckoutForm}
								setFormFilled={setFormFilled}
							/>
						</div>
						<CartSummary />
					</>
				)}
			</main>
		</div>
	);
};

export default Checkout;
