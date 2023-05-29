import React, { useContext, useState } from 'react';
import WhiteInput from '../../../../../components/shared/WhiteInput/WhiteInput';
import CTA from '../../../../../components/shared/CTA/CTA';
import { useAppSelector } from '../../../../../hooks/hooks';
import { emailOnlyValidation } from '../../../../../helpers/validations';
import { CheckoutCtx } from '../../../views/Checkout';
import { useFormik } from 'formik';

interface IEmailSection {
	isEmailOpen: boolean;
	setEmailOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setInvoiceOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailSection = ({
	isEmailOpen,
	setEmailOpen,
	setInvoiceOpen,
}: IEmailSection) => {
	const user = useAppSelector((state) => state.userReducer.user);
	const formData = useContext(CheckoutCtx);
	const [consent, setConsent] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: formData.email.emailAddress,
		},
		validationSchema: emailOnlyValidation,
		onSubmit: (val) => {
			formData.setEmailSection(val.email, consent);
			setEmailOpen(false);
			setInvoiceOpen(true);
		},
	});

	const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setConsent(!consent);

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
				<form onSubmit={formik.handleSubmit}>
					<div className='w-full mb-2'>
						<WhiteInput
							type='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							name='email'
							error={formik.errors.email}
						/>
						<p className='text-xs mt-2'>
							Na ten mail otrzymasz fakturę oraz powiadomienia dot. zamówienia.
						</p>
					</div>
					{!user ? (
						<div className='flex items-center mb-4'>
							<input
								type='checkbox'
								className='mr-2 hover:cursor-pointer outline-black text-black'
								onChange={handleConsentChange}
							/>
							<p className='text-s'>Chcę zapisać się do newslettera</p>
						</div>
					) : null}
					<CTA body='Kontynuuj' type='submit' id='emailButton' />
				</form>
			) : null}
		</div>
	);
};

export default EmailSection;
