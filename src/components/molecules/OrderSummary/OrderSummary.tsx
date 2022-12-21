import React from 'react';
import { ICheckoutForm } from '../../../models/CheckoutData';
import CTA from '../../atoms/CTA/CTA';

interface OrderSummaryProps {
	checkoutForm: ICheckoutForm;
	setFormFilled: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderSummary = ({ checkoutForm, setFormFilled }: OrderSummaryProps) => {
	const {
		name,
		lastname,
		companyName,
		nip,
		address1,
		address2,
		postalCode,
		city,
		isInvoice,
	} = checkoutForm.invoice;
	const { emailAddress } = checkoutForm.email;
	const { phoneNumber, inpost } = checkoutForm.ship;

	const handleClick = () => console.log(checkoutForm);

	return (
		<div className='OrderSummary bg-white px-4 py-5 border-[#C7C7C7] border-[1px] w-full flex flex-col gap-y-5 '>
			<div className='flex justify-between items-start'>
				<h1 className='text-xl font-[400] font-lato mb-5'>
					Podsumowanie zamówienia
				</h1>
				<button
					onClick={() => setFormFilled(false)}
					className='hover:underline text-pencil text-s'>
					Edytuj zamówienie
				</button>
			</div>

			<div>
				<h3 className='mb-1 font-lato font-[400]'>Dane kontaktowe:</h3>
				<ul className='font-lato font-[300]'>
					<li>
						<p>{emailAddress}</p>
						<p>{phoneNumber}</p>
						<p>
							Wybrany paczkomat: <span className='font-[400]'>{inpost}</span>
						</p>
					</li>
				</ul>
			</div>

			<div>
				<h3 className='mb-1 font-lato font-[400]'>Dane do faktury:</h3>
				<ul className='font-lato font-[300]'>
					<li>
						<p>
							{name} {lastname}
						</p>
					</li>
					{isInvoice ? (
						<li>
							<p>{companyName}</p>
							<p>NIP: {nip}</p>
						</li>
					) : null}
					<li>
						<p>{address1}</p>
						<p>{address2}</p>
					</li>
					<li>
						<p>
							{postalCode} {city}
						</p>
					</li>
				</ul>
			</div>

			<div className='flex justify-center'>
				<div>
					<CTA body='ZAMAWIAM' onClick={handleClick} />
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
