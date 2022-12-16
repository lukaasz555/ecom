import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import Textarea from '../../atoms/Textarea/Textarea';
import CTA from '../../atoms/CTA/CTA';

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
		if (
			formValue.email !== '' &&
			formValue.email.includes('@') &&
			formValue.email.includes('.') &&
			formValue.subject !== '' &&
			formValue.message.length >= 50
		) {
			setError(false);
			setSent(true);
			setFormValue(initValue);
		} else {
			setError(true);
		}
	};

	return (
		<form className='flex flex-col lg:basis-[50%]'>
			<Input
				type='email'
				label='Twój e-mail:'
				name='email'
				onChange={handleInputChange}
				value={formValue.email}
			/>
			<Input
				type='text'
				label='Temat:'
				name='subject'
				onChange={handleInputChange}
				value={formValue.subject}
			/>

			<Textarea
				name='message'
				label='Wiadomość:'
				onChange={handleInputChange}
				value={formValue.message}
			/>
			{error ? (
				<div className='mt-3 mb-6 text-[12px] lg:text-[14px] text-brownSugar'>
					<p>- musisz wypełnić każde pole;</p>
					<p>- email musi zawierać znaki '@' oraz '.' ;</p>
					<p>- wiadomość musi składać się z conajmniej 50 znaków;</p>
				</div>
			) : null}

			<div className='self-center lg:self-start mb-5'>
				{isSent ? (
					<p className='mt-3 text-[18px] text-darkGreen font-[500] font-lato'>
						Dziękujemy za przesłanie wiadomości!
					</p>
				) : (
					<CTA body='wyślij' onClick={handleClick} />
				)}
			</div>
		</form>
	);
};

export default ContactForm;
