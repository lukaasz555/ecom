import React, { useState } from 'react';
import WhiteInput from '../../atoms/WhiteInput/WhiteInput';
import CTA from '../../atoms/CTA/CTA';

const EmailSection = () => {
	const [emailFilled, setEmailFilled] = useState(false);
	const [email, setEmail] = useState('');
	const [consent, setConsent] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const handleClick = (e: React.MouseEvent) => {
		if (email !== '' && email.includes('@') && email.includes('.')) {
			setErrorMsg('');
			setEmailFilled(true);
		} else {
			setErrorMsg('Wprowadź prawidłowy adres e-mail');
		}
	};

	const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setConsent(!consent);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	return (
		<div className='bg-white px-4 py-5 border-[#C7C7C7] border-[1px] flex flex-col gap-y-5'>
			<div className='flex justify-between'>
				<h2 className='text-xl font-[400] font-lato'>1. Podaj adres e-mail</h2>
				{emailFilled ? (
					<button
						onClick={() => setEmailFilled(false)}
						className='hover:underline text-pencil'>
						Edytuj
					</button>
				) : null}
			</div>

			{emailFilled ? (
				<p className='text-m'>{email}</p>
			) : (
				<div className='w-full'>
					<WhiteInput type='email' value={email} onChange={handleEmailChange} />
					<p className='text-xs'>
						Na ten mail otrzymasz fakturę oraz powiadomienia dot. zamówienia.
					</p>
					<p className='text-xs text-brownSugar'>{errorMsg}</p>
				</div>
			)}

			{emailFilled ? null : (
				<div className='flex items-center'>
					<input
						type='checkbox'
						className='mr-2 hover:cursor-pointer outline-black text-black'
						onChange={handleConsentChange}
					/>
					<p className='text-s'>Chcę zapisać się do newslettera</p>
				</div>
			)}

			{emailFilled ? null : <CTA body='Kontynuuj' onClick={handleClick} />}
		</div>
	);
};

export default EmailSection;
