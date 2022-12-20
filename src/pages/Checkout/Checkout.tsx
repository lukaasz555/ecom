import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailSection from '../../components/molecules/EmailSection/EmailSection';
import InvoiceSection from '../../components/molecules/InvoiceSection/InvoiceSection';
import ShippingSection from '../../components/molecules/ShippingSection/ShippingSection';
import {
	InvoiceDataModel,
	EmailDataModel,
	ShipDataModel,
} from '../../models/CheckoutData';

const Checkout = () => {
	const [emailData, setEmailData] = useState<EmailDataModel>({
		email: '',
		consent: false,
	});
	const [invoiceData, setInvoiceData] = useState<InvoiceDataModel>({
		name: '',
		lastname: '',
		companyName: '',
		companyNip: '',
		address1: '',
		address2: '',
		city: '',
		postalCode: '',
		country: 'Polska',
	});
	const [shipData, setShipData] = useState<ShipDataModel>({
		phoneNumber: '',
		inpost: '',
	});

	const [isEmailOpen, setEmailOpen] = useState(true);
	const [isInvoiceOpen, setInvoiceOpen] = useState(false);
	const [isShippingOpen, setShippingOpen] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		const target = e.target as Element;
		if (target.id === 'emailButton') {
			setEmailOpen(false);
			setInvoiceOpen(true);
		}
		if (target.id === 'invoiceButton') {
			setEmailOpen(false);
			setInvoiceOpen(false);
			setShippingOpen(true);
		}
		if (target.id === 'shipButton') {
			console.log(shipData);
			setEmailOpen(false);
			setInvoiceOpen(false);
			setShippingOpen(true);
		}
	};

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
						emailData={emailData}
						setEmailData={setEmailData}
						isEmailOpen={isEmailOpen}
						setEmailOpen={setEmailOpen}
						handleClick={handleClick}
					/>
					<InvoiceSection
						invoiceData={invoiceData}
						setInvoiceData={setInvoiceData}
						isInvoiceOpen={isInvoiceOpen}
						setInvoiceOpen={setInvoiceOpen}
						handleClick={handleClick}
					/>
					<ShippingSection
						isShippingOpen={isShippingOpen}
						setShippingOpen={setShippingOpen}
						shipData={shipData}
						setShipData={setShipData}
						handleClick={handleClick}
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
