import React, { useState } from 'react';
import GrayInput from '../../../../../components/shared/GrayInput/GrayInput';
import Textarea from '../../../../../components/shared/Textarea/Textarea';
import CTA from '../../../../../components/shared/CTA/CTA';
import { emailValidation } from '../../../../../helpers/validations';

interface IContactForm {
	email: string;
	subject: string;
	message: string;
}

const initValue: IContactForm = {
	email: '',
	subject: '',
	message: '',
};

const ContactForm = () => {
	const [formValue, setFormValue] = useState<IContactForm>(initValue);
	const [error, setError] = useState(false);
	const [isSent, setSent] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (emailValidation(formValue.email)) {
			setError(false);
			setSent(true);
			setFormValue(initValue);
		} else {
			setError(true);
		}
	};

	return (
		<form className='flex flex-col lg:basis-[50%]'>
			<GrayInput
				type='email'
				label='Twój e-mail:'
				name='email'
				onChange={handleInputChange}
				value={formValue.email}
				disabled
			/>
			<GrayInput
				type='text'
				label='Temat:'
				name='subject'
				onChange={handleInputChange}
				value={formValue.subject}
				disabled
			/>

			<Textarea
				name='message'
				label='Wiadomość:'
				onChange={handleInputChange}
				value={formValue.message}
				disabled
			/>
			{error ? (
				<div className='mt-3 mb-6 text-xs lg:text-s text-brownSugar'>
					<p>- musisz wypełnić każde pole;</p>
					<p>- wiadomość musi składać się z conajmniej 50 znaków;</p>
				</div>
			) : null}

			<div className='mt-10 lg:mt-3 self-center lg:self-start'>
				{isSent ? (
					<p className='mt-3 text-l text-darkGreen font-[500] font-lato'>
						Dziękujemy za przesłanie wiadomości!
					</p>
				) : (
					<CTA body='wyślij' onClick={handleClick} disabled />
				)}
			</div>
		</form>
	);
};

export default ContactForm;
