import React, { useEffect, useState } from 'react';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';
import CTA from '../../atoms/CTA/CTA';
import { EmailDataModel } from '../../../models/CheckoutData';
import { emailValidation } from '../../../helpers/validations';
import { ICheckoutForm } from '../../../models/CheckoutData';

interface IEmailSection {
	emailData: EmailDataModel;
	setEmailData: React.Dispatch<React.SetStateAction<EmailDataModel>>;
	isEmailOpen: boolean;
	setEmailOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setInvoiceOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setCheckoutForm: React.Dispatch<React.SetStateAction<{} | ICheckoutForm>>;
	checkoutForm: {} | ICheckoutForm;
}

const EmailSection = ({
	emailData,
	setEmailData,
	isEmailOpen,
	setEmailOpen,
	setInvoiceOpen,
	checkoutForm,
	setCheckoutForm,
}: IEmailSection) => {
	const [email, setEmail] = useState('');
	const [consent, setConsent] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		emailData.consent = consent;
		emailData.email = email;
	}, [email, consent]);

	const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setConsent(!consent);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleContinue = (e: React.MouseEvent) => {
		if (emailValidation(email)) {
			setErrorMsg('');
			setEmailOpen(false);
			setInvoiceOpen(true);
			//setCheckoutForm((prev) => ({ ...prev, email: emailData }));
		} else {
			setErrorMsg('Wprowadź prawidłowy adres e-mail');
		}
	};

	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>1. Podaj adres e-mail</h2>
				{isEmailOpen ? null : (
					<button
						onClick={() => setEmailOpen(true)}
						className='hover:underline text-pencil'
						data-func-id='emailButton'>
						Edytuj
					</button>
				)}
			</div>

			{isEmailOpen ? (
				<div className='w-full'>
					<WhiteInput
						type='email'
						value={email}
						onChange={handleEmailChange}
						name='email'
					/>
					<p className='text-xs'>
						Na ten mail otrzymasz fakturę oraz powiadomienia dot. zamówienia.
					</p>
					<p className='text-xs text-brownSugar'>{errorMsg}</p>
				</div>
			) : null}

			{isEmailOpen ? (
				<div className='flex items-center'>
					<input
						type='checkbox'
						className='mr-2 hover:cursor-pointer outline-black text-black'
						onChange={handleConsentChange}
					/>
					<p className='text-s'>Chcę zapisać się do newslettera</p>
				</div>
			) : null}

			{isEmailOpen ? (
				<CTA body='Kontynuuj' id='emailButton' onClick={handleContinue} />
			) : null}
		</div>
	);
};

export default EmailSection;
