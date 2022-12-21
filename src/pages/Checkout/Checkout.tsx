import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailSection from '../../components/molecules/EmailSection/EmailSection';
import InvoiceSection from '../../components/molecules/InvoiceSection/InvoiceSection';
import ShippingSection from '../../components/molecules/ShippingSection/ShippingSection';
import { ICheckoutForm } from '../../models/CheckoutData';
import { initialCheckoutForm } from '../../helpers/initialStates';

const Checkout = () => {
	const [isEmailOpen, setEmailOpen] = useState(true);
	const [isInvoiceOpen, setInvoiceOpen] = useState(false);
	const [isShippingOpen, setShippingOpen] = useState(false);
	const [checkoutForm, setCheckoutForm] =
		useState<ICheckoutForm>(initialCheckoutForm);

	return (
		<div className='flex flex-col items-center bg-gray min-h-screen'>
			<div className='w-full flex justify-center bg-white border-b-[1px] border-[#C7C7C7]'>
				<header className='w-full max-w-[900px] bg-white py-3'>
					<h1 className='font-medium text-2xl font-montserrat'>
						<Link to={`/`}>someStore</Link>
					</h1>
				</header>
			</div>
			<main className='flex flex-col lg:flex-row lg:justify-between w-full max-w-[900px] my-10'>
				<div className='lg:basis-[48%] flex flex-col gap-y-5'>
					<EmailSection
						isEmailOpen={isEmailOpen}
						setEmailOpen={setEmailOpen}
						setInvoiceOpen={setInvoiceOpen}
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
					/>
				</div>
				<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] lg:basis-[48%] '>
					<h2 className='text-xl font-[400] font-lato'>Twoje zamówienie</h2>
				</div>
			</main>
		</div>
	);
};

export default Checkout;
